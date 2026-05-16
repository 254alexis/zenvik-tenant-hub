import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormModal } from "@/components/FormModal";
import { DataTable, type Column } from "@/components/DataTable";
import { useStore } from "@/lib/store";
import { useApiList, apiPost, ENDPOINTS } from "@/lib/apiClient";
import { downloadReceipt } from "@/lib/receipt";
import { toast } from "sonner";
import {
  CreditCard,
  Plus,
  Download,
  TrendingUp,
  Calendar,
  Banknote,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/payments")({
  component: PaymentsPage,
});

type PaymentRow = {
  id: string;
  date: string;
  tenant_id: string;
  tenant: string;
  unit: string;
  invoice_id: string;
  amount: number;
  method: string;
};

function PaymentsPage() {
  const { data: store, recordPayment } = useStore();
  const remote = useApiList<any>(ENDPOINTS.payments);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const unpaid = store.invoices.filter((i) => i.status !== "paid");
  const [form, setForm] = useState({
    invoice_id: unpaid[0]?.id || "",
    amount: unpaid[0]?.amount || 0,
    method: "Card",
    date: new Date().toISOString().slice(0, 10),
  });

  const rows: PaymentRow[] = useMemo(() => {
    const remoteRows = (remote.data ?? []).map((p: any, i: number) => {
      const tenant = store.tenants.find((t) => t.id === String(p.tenant_id));
      const unit = tenant ? store.units.find((u) => u.id === tenant.unit_id) : null;
      return {
        id: String(p.id ?? p.payment_id ?? `r${i}`),
        date: p.date ?? p.paid_at ?? "",
        tenant_id: String(p.tenant_id ?? ""),
        tenant: p.tenant_name ?? p.tenant ?? tenant?.name ?? "—",
        unit: p.unit ?? unit?.label ?? "—",
        invoice_id: String(p.invoice_id ?? "—"),
        amount: Number(p.amount ?? 0),
        method: p.method ?? "—",
      };
    });
    if (remoteRows.length) return remoteRows;
    return store.payments.map((p) => {
      const tenant = store.tenants.find((t) => t.id === p.tenant_id);
      const unit = tenant ? store.units.find((u) => u.id === tenant.unit_id) : null;
      return {
        ...p,
        tenant: tenant?.name ?? "—",
        unit: unit?.label ?? "—",
      };
    });
  }, [remote.data, store]);

  const totals = useMemo(() => {
    const total = rows.reduce((s, r) => s + r.amount, 0);
    const month = new Date().toISOString().slice(0, 7);
    const thisMonth = rows
      .filter((r) => (r.date || "").startsWith(month))
      .reduce((s, r) => s + r.amount, 0);
    return { total, thisMonth, count: rows.length };
  }, [rows]);

  // Monthly cash-in chart
  const byMonth = useMemo(() => {
    const m = new Map<string, number>();
    rows.forEach((r) => {
      const k = (r.date || "").slice(0, 7) || "—";
      m.set(k, (m.get(k) || 0) + r.amount);
    });
    return Array.from(m.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6)
      .map(([month, amount]) => ({ month, amount }));
  }, [rows]);

  const submit = async () => {
    const inv = store.invoices.find((i) => i.id === form.invoice_id);
    if (!inv) {
      toast.error("Select an invoice");
      return;
    }
    if (!form.amount || form.amount <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }
    setSubmitting(true);
    try {
      await apiPost(ENDPOINTS.addPayment, {
        tenant_id: inv.tenant_id,
        invoice_id: inv.id,
        amount: Number(form.amount),
        method: form.method,
        date: form.date,
      });
      toast.success("Payment recorded");
      remote.reload();
    } catch (e: any) {
      toast.warning(`Saved locally — ${e.message}`);
      recordPayment({
        tenant_id: inv.tenant_id,
        invoice_id: inv.id,
        amount: Number(form.amount),
        method: form.method,
        date: form.date,
      });
    } finally {
      setSubmitting(false);
      setOpen(false);
    }
  };

  const fmt = (n: number) => `$${n.toLocaleString()}`;

  const columns: Column<PaymentRow>[] = [
    { key: "id", label: "Receipt", className: "font-mono text-xs" },
    { key: "date", label: "Date", className: "text-muted-foreground tabular-nums" },
    { key: "tenant", label: "Tenant", render: (r) => <span className="font-medium">{r.tenant}</span> },
    { key: "unit", label: "Unit", className: "text-muted-foreground", hideOnMobile: true },
    { key: "invoice_id", label: "Invoice", className: "font-mono text-xs", hideOnMobile: true },
    { key: "method", label: "Method", className: "text-muted-foreground" },
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
      render: (r) => (
        <Button
          size="sm"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            downloadReceipt({
              id: r.id,
              date: r.date,
              tenant: r.tenant,
              unit: r.unit,
              invoice_id: r.invoice_id,
              method: r.method,
              amount: r.amount,
            });
          }}
        >
          <Download className="h-3.5 w-3.5 mr-1.5" /> Receipt
        </Button>
      ),
    },
  ];

  const methods = Array.from(new Set(rows.map((r) => r.method)));

  return (
    <AppLayout allow={["landlord", "super_admin", "tenant"]}>
      <div className="space-y-6 max-w-7xl">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Payments</h1>
            <p className="text-muted-foreground mt-1">
              {totals.count} transactions · {fmt(totals.total)} collected
            </p>
          </div>
          <Button onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4 mr-2" /> Record payment
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total collected" value={fmt(totals.total)} icon={CreditCard} tone="success" />
          <StatCard label="This month" value={fmt(totals.thisMonth)} icon={TrendingUp} tone="success" />
          <StatCard label="Transactions" value={String(totals.count)} icon={Calendar} />
          <StatCard label="Avg payment" value={fmt(totals.count ? Math.round(totals.total / totals.count) : 0)} icon={Banknote} />
        </div>

        <Card className="p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Cash inflow</h3>
              <p className="text-xs text-muted-foreground">Last {byMonth.length || 0} months</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byMonth}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: any) => fmt(Number(v))} />
                <Bar dataKey="amount" fill="oklch(0.55 0.16 160)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <DataTable<PaymentRow>
          rows={rows}
          columns={columns}
          loading={remote.loading && rows.length === 0}
          error={remote.error}
          onRetry={remote.reload}
          searchKeys={["tenant", "id", "invoice_id", "method"]}
          searchPlaceholder="Search payments…"
          filters={
            methods.length
              ? [
                  {
                    key: "method",
                    label: "Method",
                    options: methods.map((m) => ({ value: m, label: m })),
                  },
                ]
              : undefined
          }
          empty="No payments recorded yet."
        />

        <FormModal
          open={open}
          onOpenChange={setOpen}
          title="Record payment"
          submitLabel={submitting ? "Saving…" : "Save"}
          onSubmit={submit}
        >
          <div className="space-y-2">
            <Label>Invoice</Label>
            <select
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              value={form.invoice_id}
              onChange={(e) => {
                const inv = store.invoices.find((i) => i.id === e.target.value);
                setForm({ ...form, invoice_id: e.target.value, amount: inv?.amount ?? 0 });
              }}
            >
              {unpaid.length === 0 && <option value="">No unpaid invoices</option>}
              {unpaid.map((i) => {
                const t = store.tenants.find((x) => x.id === i.tenant_id);
                return (
                  <option key={i.id} value={i.id}>
                    {i.id} · {t?.name} · ${i.amount}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="grid grid-cols-3 gap-3">
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
              <Label>Method</Label>
              <select
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                value={form.method}
                onChange={(e) => setForm({ ...form, method: e.target.value })}
              >
                <option>Card</option>
                <option>Bank transfer</option>
                <option>Cash</option>
                <option>Mobile money</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
          </div>
        </FormModal>
      </div>
    </AppLayout>
  );
}
