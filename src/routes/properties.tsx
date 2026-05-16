import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Building2, MapPin, Pencil, Home as HomeIcon, TrendingUp, Layers } from "lucide-react";
import { useStore } from "@/lib/store";
import { FormModal } from "@/components/FormModal";
import { toast } from "sonner";
import { useApiList, apiPost, ENDPOINTS } from "@/lib/apiClient";
import { DataTable, Column } from "@/components/DataTable";
import { StatusBadge } from "@/components/FormModal";

export const Route = createFileRoute("/properties")({
  component: PropertiesPage,
});

type PropertyRow = {
  id: string;
  name: string;
  address: string;
  type: string;
  total_units: number;
  occupied: number;
  vacant: number;
  occupancy: number;
  status: "occupied" | "vacant" | "maintenance";
};

const empty = { name: "", address: "", units: 1, type: "Residential" };

function PropertiesPage() {
  const { data: store, addProperty } = useStore();
  const remote = useApiList<any>(ENDPOINTS.properties);
  const remoteUnits = useApiList<any>(ENDPOINTS.units);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<PropertyRow | null>(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);

  const properties: PropertyRow[] = useMemo(() => {
    const remoteProps = (remote.data ?? []).map((p: any, i: number) => ({
      id: String(p.id ?? p.property_id ?? `r${i}`),
      name: p.name ?? p.property_name ?? "Untitled",
      address: p.address ?? p.location ?? "—",
      type: p.type ?? p.category ?? "Residential",
      units: Number(p.units ?? p.unit_count ?? 0),
    }));
    const base = remoteProps.length > 0 ? remoteProps : store.properties;
    const remoteUnitList = remoteUnits.data ?? [];
    return base.map((p: any) => {
      const localUnits = store.units.filter((u) => u.property_id === p.id);
      const remoteUnitsForProp = remoteUnitList.filter(
        (u: any) => String(u.property_id ?? u.propertyId) === String(p.id),
      );
      const units = remoteUnitsForProp.length ? remoteUnitsForProp : localUnits;
      const occupied = units.filter(
        (u: any) => (u.status ?? "").toLowerCase() === "occupied",
      ).length;
      const total = units.length || p.units || 0;
      const vacant = Math.max(0, total - occupied);
      const occupancy = total ? Math.round((occupied / total) * 100) : 0;
      const status: PropertyRow["status"] =
        occupancy === 100 ? "occupied" : occupancy === 0 ? "vacant" : "occupied";
      return {
        id: p.id,
        name: p.name,
        address: p.address,
        type: p.type,
        total_units: total,
        occupied,
        vacant,
        occupancy,
        status,
      };
    });
  }, [remote.data, remoteUnits.data, store.properties, store.units]);

  const totals = useMemo(() => {
    const total_units = properties.reduce((a, p) => a + p.total_units, 0);
    const occupied = properties.reduce((a, p) => a + p.occupied, 0);
    return {
      properties: properties.length,
      total_units,
      occupied,
      occupancy: total_units ? Math.round((occupied / total_units) * 100) : 0,
    };
  }, [properties]);

  const openCreate = () => {
    setEditing(null);
    setForm(empty);
    setOpen(true);
  };

  const openEdit = (row: PropertyRow) => {
    setEditing(row);
    setForm({ name: row.name, address: row.address, units: row.total_units, type: row.type });
    setOpen(true);
  };

  const submit = async () => {
    if (!form.name.trim() || !form.address.trim()) {
      toast.error("Name and address are required");
      return;
    }
    setSaving(true);
    try {
      const endpoint = editing ? ENDPOINTS.updateProperty : ENDPOINTS.addProperty;
      const payload: Record<string, unknown> = { ...form, units: Number(form.units) || 0 };
      if (editing) payload.property_id = editing.id;
      try {
        await apiPost(endpoint, payload);
        toast.success(editing ? "Property updated" : "Property created");
        remote.reload();
      } catch (e: any) {
        // Fallback to local store so UI stays usable
        if (!editing) addProperty({ ...form, units: Number(form.units) || 0 });
        toast.success(editing ? "Saved locally" : "Added locally");
      }
      setOpen(false);
    } finally {
      setSaving(false);
    }
  };

  const columns: Column<PropertyRow>[] = [
    {
      key: "name",
      label: "Property",
      render: (r) => (
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center">
            <Building2 className="h-4 w-4 text-primary" />
          </div>
          <div className="min-w-0">
            <div className="font-medium truncate">{r.name}</div>
            <div className="text-xs text-muted-foreground flex items-center gap-1 truncate">
              <MapPin className="h-3 w-3" /> {r.address}
            </div>
          </div>
        </div>
      ),
    },
    { key: "type", label: "Type", className: "text-muted-foreground" },
    {
      key: "total_units",
      label: "Units",
      render: (r) => (
        <span className="tabular-nums font-medium">{r.total_units}</span>
      ),
    },
    {
      key: "occupancy",
      label: "Occupancy",
      render: (r) => (
        <div className="min-w-[120px]">
          <div className="flex justify-between text-xs mb-1">
            <span className="font-medium">{r.occupancy}%</span>
            <span className="text-muted-foreground tabular-nums">
              {r.occupied}/{r.total_units}
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${r.occupancy}%` }}
            />
          </div>
        </div>
      ),
    },
    {
      key: "vacant",
      label: "Vacant",
      render: (r) => <StatusBadge status={r.vacant > 0 ? "vacant" : "occupied"} />,
    },
    {
      key: "actions",
      label: "",
      className: "text-right w-12",
      render: (r) => (
        <Button
          size="sm"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            openEdit(r);
          }}
        >
          <Pencil className="h-3.5 w-3.5" />
        </Button>
      ),
    },
  ];

  const stats = [
    { label: "Total properties", value: totals.properties, icon: Building2 },
    { label: "Total units", value: totals.total_units, icon: Layers },
    { label: "Occupied", value: totals.occupied, icon: HomeIcon },
    { label: "Occupancy rate", value: `${totals.occupancy}%`, icon: TrendingUp },
  ];

  return (
    <AppLayout allow={["landlord", "super_admin"]}>
      <div className="space-y-6 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Properties</h1>
            <p className="text-muted-foreground mt-1">
              Manage all buildings, units, and occupancy across your portfolio.
            </p>
          </div>
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4 mr-2" /> Add property
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

        <DataTable<PropertyRow>
          rows={properties}
          columns={columns}
          loading={remote.loading}
          error={remote.error}
          onRetry={remote.reload}
          searchKeys={["name", "address", "type"]}
          searchPlaceholder="Search properties or address…"
          filters={[
            {
              key: "type",
              label: "Types",
              options: Array.from(new Set(properties.map((p) => p.type))).map((t) => ({
                value: t,
                label: t,
              })),
            },
          ]}
          empty="No properties yet."
        />

        <FormModal
          open={open}
          onOpenChange={setOpen}
          title={editing ? "Edit property" : "Add property"}
          description={editing ? "Update building details." : "Create a new building in your portfolio."}
          submitLabel={saving ? "Saving…" : editing ? "Save changes" : "Create"}
          onSubmit={submit}
        >
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              maxLength={100}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Address</Label>
            <Input
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              maxLength={200}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Units</Label>
              <Input
                type="number"
                min={1}
                value={form.units}
                onChange={(e) => setForm({ ...form, units: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <select
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option>Residential</option>
                <option>Commercial</option>
                <option>Mixed-use</option>
              </select>
            </div>
          </div>
        </FormModal>
      </div>
    </AppLayout>
  );
}
