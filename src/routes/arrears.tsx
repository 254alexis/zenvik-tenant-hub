import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { AppLayout } from "@/components/AppLayout";
import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable, type Column } from "@/components/DataTable";
import { StatusBadge } from "@/components/FormModal";
import { useApiList, ENDPOINTS } from "@/lib/apiClient";
import { useStore } from "@/lib/store";
import { AlertTriangle, Clock, DollarSign, Users, Mail } from "lucide-react";
import { toast } from "sonner";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

export const Route = createFileRoute("/arrears")({
  component: ArrearsPage,
});

type ArrearRow = {
  id: string;
  tenant: string;
  unit: string;
  invoice_id: string;
  due: string;
  amount: number;
  days_overdue: number;
  status: "pending" | "overdue";
};

function daysSince(date: string) {
  if (!date) return 0;
  const d = new Date(date).getTime();
  if (isNaN(d)) return 0;
  return Math.max(0, Math.floor((Date.now() - d) / 86400000));
}

function ArrearsPage() {
  const { data: store } = useStore();
  const remoteInvoices = useApiList<any>(ENDPOINTS.invoices);
  const remoteArrears = useApiList<any>(ENDPOINTS.arrears);

  const rows: ArrearRow[] = useMemo(() => {
    const remoteRows = (remoteInvoices.data ?? [])
      .filter((i: any) => {
        const s = String(i.status ?? "").toLowerCase();
        return s === "overdue" || s === "pending";
      })
      .map((i: any, idx: number) => {
        const due = i.due ?? i.due_date ?? "";
        const days = daysSince(due);
        return {
          id: String(i.id ?? i.invoice_id ?? `r${idx}`),
          tenant: i.tenant_name ?? i.tenant ?? "—",
          unit: i.unit ?? i.unit_label ?? "—",
          invoice_id: String(i.id ?? i.invoice_id ?? ""),
          due,
          amount: Number(i.amount ?? i.balance ?? 0),
          days_overdue: days,
          status: (days > 0 ? "overdue" : "pending") as "overdue" | "pending",
        };
      });

    if (remoteRows.length) return remoteRows;

    return store.invoices
      .filter((i) => i.status !== "paid")
      .map((i) => {
        const t = store.tenants.find((x) => x.id === i.tenant_id);
        const u = t ? store.units.find((x) => x.id === t.unit_id) : null;
        const days = daysSince(i.due);
        return {
          id: i.id,
          tenant: t?.name ?? "—",
          unit: u?.label ?? "—",
          invoice_id: i.id,
          due: i.due,
          amount: i.amount,
          days_overdue: days,
          status: (i.status === "overdue" || days > 0 ? "overdue" : "pending") as
            | "overdue"
            | "pending",
        };
      });
  }, [remoteInvoices.data, store]);

  const totalOverdue = rows.filter((r) => r.status === "overdue").reduce((s, r) => s + r.amount, 0);
  const totalPending = rows.filter((r) => r.status === "pending").reduce((s, r) => s + r.amount, 0);
  const tenantsAffected = new Set(rows.map((r) => r.tenant)).size;
  const avgDays = rows.length
    ? Math.round(rows.reduce((s, r) => s + r.days_overdue, 0) / rows.length)
    : 0;

  // Trend (from /analytics/arrears.php with fallback)
  const trend = useMemo(() => {
    const remote = (remoteArrears.data ?? []).map((p: any) => ({
      month: p.month ?? p.label ?? "",
      amount: Number(p.amount ?? p.value ?? 0),
    }));
    if (remote.length) return remote;
    return [
      { month: "Jun", amount: 1200 },
      { month: "Jul", amount: 1850 },
      { month: "Aug", amount: 1500 },
      { month: "Sep", amount: 2100 },
      { month: "Oct", amount: 2400 },
      { month: "Nov", amount: totalOverdue || 2800 },
    ];
  }, [remoteArrears.data, totalOverdue]);

  // Aging buckets
  const buckets = useMemo(() => {
    const b = { "0-30": 0, "31-60": 0, "61-90": 0, "90+": 0 } as Record<string, number>;
    rows.forEach((r) => {
      if (r.days_overdue <= 30) b["0-30"] += r.amount;
      else if (r.days_overdue <= 60) b["31-60"] += r.amount;
      else if (r.days_overdue <= 90) b["61-90"] += r.amount;
      else b["90+"] += r.amount;
    });
    return Object.entries(b).map(([range, amount]) => ({ range, amount }));
  }, [rows]);

  const fmt = (n: number) => `$${n.toLocaleString()}`;

  const columns: Column<ArrearRow>[] = [
    { key: "tenant", label: "Tenant", render: (r) => <span className="font-medium">{r.tenant}</span> },
    { key: "unit", label: "Unit", className: "text-muted-foreground", hideOnMobile: true },
    { key: "invoice_id", label: "Invoice", className: "font-mono text-xs", hideOnMobile: true },
    { key: "due", label: "Due", className: "text-muted-foreground tabular-nums" },
    {
      key: "days_overdue",
      label: "Days late",
      render: (r) => (
        <span
          className={`tabular-nums font-medium ${
            r.days_overdue > 60
              ? "text-[oklch(0.55_0.2_25)]"
              : r.days_overdue > 30
                ? "text-[oklch(0.6_0.16_75)]"
                : "text-muted-foreground"
          }`}
        >
          {r.days_overdue}d
        </span>
      ),
    },
    { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
    {
      key: "amount",
      label: "Balance",
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
            toast.success(`Reminder sent to ${r.tenant}`);
          }}
        >
          <Mail className="h-3.5 w-3.5 mr-1.5" /> Remind
        </Button>
      ),
    },
  ];

  return (
    <AppLayout allow={["landlord", "super_admin", "staff"]}>
      <div className="space-y-6 max-w-7xl">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Arrears</h1>
          <p className="text-muted-foreground mt-1">
            Outstanding rent and overdue balances across all tenants
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total overdue" value={fmt(totalOverdue)} icon={AlertTriangle} tone="warning" />
          <StatCard label="Pending" value={fmt(totalPending)} icon={Clock} />
          <StatCard label="Tenants affected" value={String(tenantsAffected)} icon={Users} />
          <StatCard label="Avg days late" value={`${avgDays}d`} icon={DollarSign} tone="warning" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="p-5 shadow-[var(--shadow-card)] lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Arrears trend</h3>
              <span className="text-xs text-muted-foreground">last 6 months</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trend}>
                  <defs>
                    <linearGradient id="arrearsFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.6 0.18 25)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="oklch(0.6 0.18 25)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v: any) => fmt(Number(v))} />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="oklch(0.55 0.2 25)"
                    strokeWidth={2}
                    fill="url(#arrearsFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card className="p-5 shadow-[var(--shadow-card)]">
            <h3 className="font-semibold mb-4">Aging buckets</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={buckets}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="range" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v: any) => fmt(Number(v))} />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="oklch(0.55 0.2 25)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <DataTable<ArrearRow>
          rows={rows}
          columns={columns}
          loading={remoteInvoices.loading && rows.length === 0}
          error={remoteInvoices.error}
          onRetry={remoteInvoices.reload}
          searchKeys={["tenant", "unit", "invoice_id"]}
          searchPlaceholder="Search tenants or invoices…"
          filters={[
            {
              key: "status",
              label: "Status",
              options: [
                { value: "overdue", label: "Overdue" },
                { value: "pending", label: "Pending" },
              ],
            },
          ]}
          empty="No outstanding balances. 🎉"
        />
      </div>
    </AppLayout>
  );
}
