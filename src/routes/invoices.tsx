import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormModal, StatusBadge } from "@/components/FormModal";
import { DataTable, type Column } from "@/components/DataTable";
import { useStore } from "@/lib/store";
import { useApiList, apiPost, ENDPOINTS } from "@/lib/apiClient";
import { downloadReceipt } from "@/lib/receipt";
import { toast } from "sonner";
import {
  FileText,
  Plus,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Download,
} from "lucide-react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export const Route = createFileRoute("/invoices")({
  component: InvoicesPage,
});

type InvoiceRow = {
  id: string;
  tenant_id: string;
  tenant: string;
  unit: string;
  period: string;
  amount: number;
  due: string;
  status: "paid" | "pending" | "overdue";
};

function InvoicesPage() {
  const { data: store, addInvoice } = useStore();
  const remote = useApiList<any>(ENDPOINTS.invoices);
  const remoteFinance = useApiList<any>(ENDPOINTS.finance);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    tenant_id: store.tenants[0]?.id || "",
    period: "",
    amount: 0,
    due: "",
    status: "pending" as "paid" | "pending" | "overdue",
  });

  const rows: InvoiceRow[] = useMemo(() => {
    const remoteRows = (remote.data ?? []).map((r: any, i: number) => {
      const tenant = store.tenants.find((t) => t.id === String(r.tenant_id));
      const unit = tenant ? store.units.find((u) => u.id === tenant.unit_id) : null;
      return {
        id: String(r.id ?? r.invoice_id ?? `r${i}`),
        tenant_id: String(r.tenant_id ?? ""),
        tenant: r.tenant_name ?? r.tenant ?? tenant?.name ?? "—",
        unit: r.unit ?? unit?.label ?? "—",
        period: r.period ?? r.month ?? "",
        amount: Number(r.amount ?? r.total ?? 0),
        due: r.due ?? r.due_date ?? "",
        status: ((r.status ?? "pending") as string).toLowerCase() as InvoiceRow["status"],
      };
    });
    if (remoteRows.length) return remoteRows;
    return store.invoices.map((i) => {
      const tenant = store.tenants.find((t) => t.id === i.tenant_id);
      const unit = tenant ? store.units.find((u) => u.id === tenant.unit_id) : null;
      return {
        ...i,
        tenant: tenant?.name ?? "—",
        unit: unit?.label ?? "—",
      };
    });
  }, [remote.data, store]);

  const totals = useMemo(() => {
    const paid = rows.filter((r) => r.status === "paid").reduce((s, r) => s + r.amount, 0);
    const pending = rows.filter((r) => r.status === "pending").reduce((s, r) => s + r.amount, 0);
    const overdue = rows.filter((r) => r.status === "overdue").reduce((s, r) => s + r.amount, 0);
    return { paid, pending, overdue, total: paid + pending + overdue };
  }, [rows]);

  // Revenue vs Expenses chart (from /analytics/finance.php with fallback)
  const finance = useMemo(() => {
    const remoteRows = (remoteFinance.data ?? []).map((p: any) => ({
      month: p.month ?? p.label ?? "",
      revenue: Number(p.revenue ?? p.income ?? 0),
      expenses: Number(p.expenses ?? p.expense ?? 0),
    }));
    if (remoteRows.length) return remoteRows;
    return [
      { month: "Jun", revenue: 14200, expenses: 4100 },
      { month: "Jul", revenue: 15600, expenses: 4400 },
      { month: "Aug", revenue: 15100, expenses: 5200 },
      { month: "Sep", revenue: 16800, expenses: 4900 },
      { month: "Oct", revenue: 17400, expenses: 5800 },
      { month: "Nov", revenue: 18250, expenses: 5400 },
    ];
  }, [remoteFinance.data]);

  const submit = async () => {
    if (!form.tenant_id || !form.period.trim() || !form.amount || !form.due) {
      toast.error("All fields are required");
      return;
    }
    setSaving(true);
    try {
      await apiPost(ENDPOINTS.addInvoice, form);
      toast.success("Invoice created");
      remote.reload();
    } catch (e: any) {
      toast.warning(`Saved locally — ${e.message}`);
      addInvoice({ ...form, amount: Number(form.amount) });
    } finally {
      setSaving(false);
      setOpen(false);
    }
  };

  const fmt = (n: number) => `$${n.toLocaleString()}`;

  const columns: Column<InvoiceRow>[] = [
    { key: "id", label: "Invoice", className: "font-mono text-xs" },
    { key: "tenant", label: "Tenant", render: (r) => <span className="font-medium">{r.tenant}</span> },
    { key: "unit", label: "Unit", className: "text-muted-foreground", hideOnMobile: true },
    { key: "period", label: "Period", className: "text-muted-foreground" },
    { key: "due", label: "Due", className: "text-muted-foreground tabular-nums", hideOnMobile: true },
    { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
    {
      key: "amount",
      label: "Amount",
      className: "text-right font-semibold tabular-nums",
      render: (r) => <span className="block text-right">{fmt(r.amount)}</span>,
    },
    {
      key: "actions",
      label: "",
      className: "text-right",
      render: (r) =>
        r.status === "paid" ? (
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              downloadReceipt({
                id: r.id,
                date: r.due,
                tenant: r.tenant,
                unit: r.unit,
                invoice_id: r.id,
                method: "—",
                amount: r.amount,
              });
            }}
          >
            <Download className="h-3.5 w-3.5 mr-1.5" /> Receipt
          </Button>
        ) : null,
    },
  ];

  return (
    <AppLayout allow={["landlord", "super_admin", "tenant"]}>
      <div className="space-y-6 max-w-7xl">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Invoices</h1>
            <p className="text-muted-foreground mt-1">
              {rows.length} invoices · {fmt(totals.total)} billed
            </p>
          </div>
          <Button onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4 mr-2" /> New invoice
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total billed" value={fmt(totals.total)} icon={FileText} />
          <StatCard label="Collected" value={fmt(totals.paid)} icon={CheckCircle2} tone="success" />
          <StatCard label="Pending" value={fmt(totals.pending)} icon={Clock} />
          <StatCard label="Overdue" value={fmt(totals.overdue)} icon={AlertTriangle} tone="warning" />
        </div>

        <Card className="p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Revenue vs Expenses</h3>
              <p className="text-xs text-muted-foreground">Monthly comparison</p>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={finance}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: any) => fmt(Number(v))} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="revenue" fill="oklch(0.55 0.16 160)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="expenses" fill="oklch(0.6 0.18 25)" radius={[6, 6, 0, 0]} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="oklch(0.4 0.18 260)"
                  strokeWidth={2}
                  dot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <DataTable<InvoiceRow>
          rows={rows}
          columns={columns}
          loading={remote.loading && rows.length === 0}
          error={remote.error}
          onRetry={remote.reload}
          searchKeys={["tenant", "id", "period", "unit"]}
          searchPlaceholder="Search invoices, tenants…"
          filters={[
            {
              key: "status",
              label: "Status",
              options: [
                { value: "paid", label: "Paid" },
                { value: "pending", label: "Pending" },
                { value: "overdue", label: "Overdue" },
              ],
            },
          ]}
          empty="No invoices yet."
        />

        <FormModal
          open={open}
          onOpenChange={setOpen}
          title="New invoice"
          submitLabel={saving ? "Saving…" : "Create"}
          onSubmit={submit}
        >
          <div className="space-y-2">
            <Label>Tenant</Label>
            <select
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              value={form.tenant_id}
              onChange={(e) => setForm({ ...form, tenant_id: e.target.value })}
            >
              {store.tenants.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Period</Label>
              <Input
                value={form.period}
                onChange={(e) => setForm({ ...form, period: e.target.value })}
                placeholder="Nov 2025"
              />
            </div>
            <div className="space-y-2">
              <Label>Amount</Label>
              <Input
                type="number"
                min={0}
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label>Due date</Label>
              <Input type="date" value={form.due} onChange={(e) => setForm({ ...form, due: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <select
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm capitalize"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as any })}
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div>
        </FormModal>
      </div>
    </AppLayout>
  );
}
