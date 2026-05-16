import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Bed, Home as HomeIcon, Wrench, DoorOpen } from "lucide-react";
import { useStore } from "@/lib/store";
import { FormModal, StatusBadge } from "@/components/FormModal";
import { toast } from "sonner";
import { useApiList, ENDPOINTS } from "@/lib/apiClient";
import { DataTable, Column } from "@/components/DataTable";

export const Route = createFileRoute("/units")({
  component: UnitsPage,
});

type UnitRow = {
  id: string;
  property_id: string;
  property_name: string;
  label: string;
  bedrooms: number;
  rent: number;
  status: "occupied" | "vacant" | "maintenance";
};

function UnitsPage() {
  const { data: store, addUnit } = useStore();
  const remoteUnits = useApiList<any>(ENDPOINTS.units);
  const remoteProps = useApiList<any>(ENDPOINTS.properties);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    property_id: store.properties[0]?.id || "",
    label: "",
    bedrooms: 1,
    rent: 1500,
    status: "vacant" as const,
  });

  const properties = useMemo(() => {
    const r = (remoteProps.data ?? []).map((p: any) => ({
      id: String(p.id ?? p.property_id),
      name: p.name ?? p.property_name ?? "Untitled",
    }));
    return r.length ? r : store.properties.map((p) => ({ id: p.id, name: p.name }));
  }, [remoteProps.data, store.properties]);

  const units: UnitRow[] = useMemo(() => {
    const remoteList = (remoteUnits.data ?? []).map((u: any, i: number) => ({
      id: String(u.id ?? u.unit_id ?? `u${i}`),
      property_id: String(u.property_id ?? u.propertyId ?? ""),
      label: u.label ?? u.unit_label ?? u.name ?? "Unit",
      bedrooms: Number(u.bedrooms ?? u.beds ?? 0),
      rent: Number(u.rent ?? u.amount ?? 0),
      status: ((u.status ?? "vacant").toLowerCase() as UnitRow["status"]) || "vacant",
    }));
    const base = remoteList.length ? remoteList : store.units;
    return base.map((u: any) => ({
      ...u,
      property_name: properties.find((p) => p.id === u.property_id)?.name ?? "—",
    }));
  }, [remoteUnits.data, store.units, properties]);

  const stats = useMemo(() => {
    const occupied = units.filter((u) => u.status === "occupied").length;
    const vacant = units.filter((u) => u.status === "vacant").length;
    const maintenance = units.filter((u) => u.status === "maintenance").length;
    return [
      { label: "Total units", value: units.length, icon: HomeIcon },
      { label: "Occupied", value: occupied, icon: HomeIcon },
      { label: "Vacant", value: vacant, icon: DoorOpen },
      { label: "Maintenance", value: maintenance, icon: Wrench },
    ];
  }, [units]);

  const submit = () => {
    if (!form.label.trim() || !form.property_id) {
      toast.error("Label and property are required");
      return;
    }
    addUnit({ ...form, bedrooms: Number(form.bedrooms), rent: Number(form.rent) });
    toast.success("Unit added");
    setForm({ ...form, label: "" });
  };

  const columns: Column<UnitRow>[] = [
    {
      key: "label",
      label: "Unit",
      render: (u) => (
        <div>
          <div className="font-medium">{u.label}</div>
          <div className="text-xs text-muted-foreground">{u.property_name}</div>
        </div>
      ),
    },
    {
      key: "bedrooms",
      label: "Bedrooms",
      render: (u) => (
        <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
          <Bed className="h-3.5 w-3.5" /> {u.bedrooms}
        </span>
      ),
    },
    {
      key: "rent",
      label: "Rent",
      render: (u) => (
        <span className="font-medium tabular-nums">${u.rent.toLocaleString()}/mo</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (u) => <StatusBadge status={u.status} />,
    },
  ];

  return (
    <AppLayout allow={["landlord", "super_admin"]}>
      <div className="space-y-6 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Units</h1>
            <p className="text-muted-foreground mt-1">
              {units.length} units across {properties.length} properties
            </p>
          </div>
          <Button onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4 mr-2" /> Add unit
          </Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.label} className="p-4 shadow-[var(--shadow-card)]">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                    <div className="text-xl font-semibold tabular-nums">{s.value}</div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <DataTable<UnitRow>
          rows={units}
          columns={columns}
          loading={remoteUnits.loading}
          error={remoteUnits.error}
          onRetry={remoteUnits.reload}
          searchKeys={["label", "property_name"]}
          searchPlaceholder="Search units…"
          filters={[
            {
              key: "status",
              label: "Statuses",
              options: [
                { value: "occupied", label: "Occupied" },
                { value: "vacant", label: "Vacant" },
                { value: "maintenance", label: "Maintenance" },
              ],
            },
            {
              key: "property_id",
              label: "Properties",
              options: properties.map((p) => ({ value: p.id, label: p.name })),
            },
          ]}
          empty="No units yet."
        />

        <FormModal
          open={open}
          onOpenChange={setOpen}
          title="Add unit"
          submitLabel="Create"
          onSubmit={submit}
        >
          <div className="space-y-2">
            <Label>Property</Label>
            <select
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              value={form.property_id}
              onChange={(e) => setForm({ ...form, property_id: e.target.value })}
            >
              {properties.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label>Label</Label>
            <Input
              value={form.label}
              onChange={(e) => setForm({ ...form, label: e.target.value })}
              placeholder="Apt 5B"
              required
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label>Bedrooms</Label>
              <Input
                type="number"
                min={0}
                value={form.bedrooms}
                onChange={(e) => setForm({ ...form, bedrooms: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label>Rent</Label>
              <Input
                type="number"
                min={0}
                value={form.rent}
                onChange={(e) => setForm({ ...form, rent: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <select
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm capitalize"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as any })}
              >
                <option value="vacant">Vacant</option>
                <option value="occupied">Occupied</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>
        </FormModal>
      </div>
    </AppLayout>
  );
}
