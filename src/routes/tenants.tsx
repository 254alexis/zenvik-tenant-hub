import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Mail,
  Phone,
  Users,
  CalendarDays,
  Home as HomeIcon,
  CircleDollarSign,
  AlertCircle,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { FormModal, StatusBadge } from "@/components/FormModal";
import { toast } from "sonner";
import { useApiList, apiPost, ENDPOINTS } from "@/lib/apiClient";
import { DataTable, Column } from "@/components/DataTable";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export const Route = createFileRoute("/tenants")({
  component: TenantsPage,
});

type TenantRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  unit_id: string | null;
  unit_label: string;
  property_name: string;
  rent: number;
  lease_start: string;
  lease_end: string;
  move_out: string | null;
  payment_status: "paid" | "pending" | "overdue";
  balance: number;
};

const initialForm = {
  name: "",
  email: "",
  phone: "",
  unit_id: "",
  lease_start: "",
  lease_end: "",
};

function TenantsPage() {
  const { data: store, addTenant } = useStore();
  const remoteTenants = useApiList<any>(ENDPOINTS.tenants);
  const remoteUnits = useApiList<any>(ENDPOINTS.units);
  const remoteInvoices = useApiList<any>(ENDPOINTS.invoices);

  const [openAdd, setOpenAdd] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [active, setActive] = useState<TenantRow | null>(null);

  const units = useMemo(() => {
    const r = (remoteUnits.data ?? []).map((u: any, i: number) => ({
      id: String(u.id ?? u.unit_id ?? `u${i}`),
      label: u.label ?? u.name ?? "Unit",
      property_id: String(u.property_id ?? ""),
      rent: Number(u.rent ?? u.amount ?? 0),
      status: (u.status ?? "vacant").toLowerCase(),
    }));
    return r.length ? r : store.units;
  }, [remoteUnits.data, store.units]);

  const properties = store.properties;

  const tenants: TenantRow[] = useMemo(() => {
    const remoteList = (remoteTenants.data ?? []).map((t: any, i: number) => ({
      id: String(t.id ?? t.tenant_id ?? `t${i}`),
      name: t.name ?? t.full_name ?? "Tenant",
      email: t.email ?? "",
      phone: t.phone ?? t.phone_number ?? "",
      unit_id: t.unit_id ? String(t.unit_id) : null,
      lease_start: t.lease_start ?? t.start_date ?? "",
      lease_end: t.lease_end ?? t.end_date ?? "",
      move_out: t.move_out ?? null,
    }));
    const base = remoteList.length
      ? remoteList
      : store.tenants.map((t) => ({
          ...t,
          lease_start: "2025-01-01",
          lease_end: "2025-12-31",
          move_out: null,
        }));

    const invoiceList = remoteInvoices.data ?? store.invoices;

    return base.map((t: any) => {
      const unit = units.find((u: any) => u.id === t.unit_id);
      const property = unit ? properties.find((p) => p.id === unit.property_id) : null;
      const tenantInvoices = invoiceList.filter(
        (inv: any) => String(inv.tenant_id) === String(t.id),
      );
      const overdue = tenantInvoices.find(
        (i: any) => (i.status ?? "").toLowerCase() === "overdue",
      );
      const pending = tenantInvoices.find(
        (i: any) => (i.status ?? "").toLowerCase() === "pending",
      );
      const balance = tenantInvoices
        .filter((i: any) => (i.status ?? "").toLowerCase() !== "paid")
        .reduce((a: number, i: any) => a + Number(i.amount ?? 0), 0);
      const payment_status: TenantRow["payment_status"] = overdue
        ? "overdue"
        : pending
          ? "pending"
          : "paid";
      return {
        id: t.id,
        name: t.name,
        email: t.email,
        phone: t.phone,
        unit_id: t.unit_id,
        unit_label: unit?.label ?? "—",
        property_name: property?.name ?? "—",
        rent: Number(unit?.rent ?? 0),
        lease_start: t.lease_start ?? "",
        lease_end: t.lease_end ?? "",
        move_out: t.move_out ?? null,
        payment_status,
        balance,
      };
    });
  }, [remoteTenants.data, store.tenants, remoteInvoices.data, store.invoices, units, properties]);

  const stats = useMemo(() => {
    const overdue = tenants.filter((t) => t.payment_status === "overdue").length;
    const active = tenants.filter((t) => !t.move_out).length;
    return [
      { label: "Total tenants", value: tenants.length, icon: Users },
      { label: "Active leases", value: active, icon: HomeIcon },
      { label: "On time", value: tenants.filter((t) => t.payment_status === "paid").length, icon: CircleDollarSign },
      { label: "Overdue", value: overdue, icon: AlertCircle },
    ];
  }, [tenants]);

  const vacantUnits = units.filter((u: any) => u.status !== "occupied");

  const submit = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Name and email are required");
      return;
    }
    setSaving(true);
    try {
      try {
        await apiPost(ENDPOINTS.addTenant, {
          name: form.name,
          email: form.email,
          phone: form.phone,
          unit_id: form.unit_id || null,
          lease_start: form.lease_start || null,
          lease_end: form.lease_end || null,
        });
        toast.success("Tenant created");
        remoteTenants.reload();
      } catch {
        addTenant({
          name: form.name,
          email: form.email,
          phone: form.phone,
          unit_id: form.unit_id || null,
        });
        toast.success("Tenant added locally");
      }
      setForm(initialForm);
      setOpenAdd(false);
    } finally {
      setSaving(false);
    }
  };

  const columns: Column<TenantRow>[] = [
    {
      key: "name",
      label: "Tenant",
      render: (t) => {
        const initials = t.name
          .split(" ")
          .map((n) => n[0])
          .slice(0, 2)
          .join("")
          .toUpperCase();
        return (
          <div className="flex items-center gap-3 min-w-0">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <div className="font-medium truncate">{t.name}</div>
              <div className="text-xs text-muted-foreground truncate">{t.email}</div>
            </div>
          </div>
        );
      },
    },
    {
      key: "unit",
      label: "Unit",
      render: (t) =>
        t.unit_id ? (
          <div>
            <div className="text-sm font-medium">{t.unit_label}</div>
            <div className="text-xs text-muted-foreground">{t.property_name}</div>
          </div>
        ) : (
          <span className="text-muted-foreground text-sm">Unassigned</span>
        ),
    },
    {
      key: "lease_end",
      label: "Lease ends",
      render: (t) =>
        t.lease_end ? (
          <span className="text-sm text-muted-foreground tabular-nums">{t.lease_end}</span>
        ) : (
          "—"
        ),
    },
    {
      key: "payment_status",
      label: "Payment",
      render: (t) => <StatusBadge status={t.payment_status} />,
    },
    {
      key: "balance",
      label: "Balance",
      className: "text-right",
      render: (t) => (
        <span
          className={`tabular-nums font-medium ${t.balance > 0 ? "text-[oklch(0.5_0.18_25)]" : "text-muted-foreground"}`}
        >
          ${t.balance.toLocaleString()}
        </span>
      ),
    },
  ];

  return (
    <AppLayout allow={["landlord", "super_admin"]}>
      <div className="space-y-6 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Tenants</h1>
            <p className="text-muted-foreground mt-1">
              {tenants.length} tenants across your portfolio
            </p>
          </div>
          <Button onClick={() => setOpenAdd(true)}>
            <Plus className="h-4 w-4 mr-2" /> Add tenant
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

        <DataTable<TenantRow>
          rows={tenants}
          columns={columns}
          loading={remoteTenants.loading}
          error={remoteTenants.error}
          onRetry={remoteTenants.reload}
          searchKeys={["name", "email", "phone", "unit_label", "property_name"]}
          searchPlaceholder="Search tenants by name, email, unit…"
          filters={[
            {
              key: "payment_status",
              label: "Payment",
              options: [
                { value: "paid", label: "Paid" },
                { value: "pending", label: "Pending" },
                { value: "overdue", label: "Overdue" },
              ],
            },
          ]}
          onRowClick={(t) => setActive(t)}
          empty="No tenants yet."
        />

        {/* Add tenant modal */}
        <FormModal
          open={openAdd}
          onOpenChange={setOpenAdd}
          title="Add tenant"
          submitLabel={saving ? "Saving…" : "Create"}
          onSubmit={submit}
        >
          <div className="space-y-2">
            <Label>Full name</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              maxLength={100}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                maxLength={255}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                maxLength={32}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Assign unit (optional)</Label>
            <select
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              value={form.unit_id}
              onChange={(e) => setForm({ ...form, unit_id: e.target.value })}
            >
              <option value="">— None —</option>
              {vacantUnits.map((u: any) => {
                const p = properties.find((pp) => pp.id === u.property_id);
                return (
                  <option key={u.id} value={u.id}>
                    {u.label} · {p?.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Lease start</Label>
              <Input
                type="date"
                value={form.lease_start}
                onChange={(e) => setForm({ ...form, lease_start: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Lease end</Label>
              <Input
                type="date"
                value={form.lease_end}
                onChange={(e) => setForm({ ...form, lease_end: e.target.value })}
              />
            </div>
          </div>
        </FormModal>

        {/* Tenant profile sheet */}
        <Sheet open={!!active} onOpenChange={(v) => !v && setActive(null)}>
          <SheetContent className="w-full sm:max-w-md overflow-y-auto">
            {active && (
              <>
                <SheetHeader className="text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {active.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <SheetTitle>{active.name}</SheetTitle>
                      <SheetDescription>Tenant profile</SheetDescription>
                    </div>
                  </div>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                  <Card className="p-4 space-y-2">
                    <div className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                      Contact
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" /> {active.email || "—"}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" /> {active.phone || "—"}
                    </div>
                  </Card>

                  <Card className="p-4 space-y-3">
                    <div className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                      Lease
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <HomeIcon className="h-4 w-4 text-muted-foreground" />
                      {active.unit_id
                        ? `${active.unit_label} · ${active.property_name}`
                        : "Unassigned"}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-xs text-muted-foreground">Move-in</div>
                        <div className="font-medium tabular-nums flex items-center gap-1">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {active.lease_start || "—"}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">
                          {active.move_out ? "Move-out" : "Lease ends"}
                        </div>
                        <div className="font-medium tabular-nums flex items-center gap-1">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {active.move_out || active.lease_end || "—"}
                        </div>
                      </div>
                    </div>
                    {active.rent > 0 && (
                      <div className="text-sm pt-2 border-t border-border">
                        <span className="text-muted-foreground">Monthly rent: </span>
                        <span className="font-semibold tabular-nums">
                          ${active.rent.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </Card>

                  <Card className="p-4 space-y-3">
                    <div className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                      Payment status
                    </div>
                    <div className="flex items-center justify-between">
                      <StatusBadge status={active.payment_status} />
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">Outstanding</div>
                        <div
                          className={`font-semibold tabular-nums ${active.balance > 0 ? "text-[oklch(0.5_0.18_25)]" : ""}`}
                        >
                          ${active.balance.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </AppLayout>
  );
}
