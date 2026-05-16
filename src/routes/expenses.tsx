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
import { useApiList, apiPost, ENDPOINTS } from "@/lib/apiClient";
import { toast } from "sonner";
import { Wallet, Plus, TrendingDown, Receipt, Building2 } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export const Route = createFileRoute("/expenses")({
  component: ExpensesPage,
});

type ExpenseRow = {
  id: string;
  date: string;
  category: string;
  property: string;
  vendor: string;
  description: string;
  amount: number;
};

const FALLBACK: ExpenseRow[] = [
  { id: "e1", date: "2025-11-04", category: "Maintenance", property: "Riverside", vendor: "QuickFix Plumbing", description: "Leak repair – Apt 4B", amount: 320 },
  { id: "e2", date: "2025-11-02", category: "Utilities", property: "Northgate", vendor: "City Water Co.", description: "Water bill", amount: 540 },
  { id: "e3", date: "2025-10-28", category: "Insurance", property: "Eastview", vendor: "Aegis Insurance", description: "Quarterly premium", amount: 1200 },
  { id: "e4", date: "2025-10-15", category: "Cleaning", property: "Riverside", vendor: "BrightCo", description: "Common areas – October", amount: 450 },
  { id: "e5", date: "2025-10-08", category: "Maintenance", property: "Northgate", vendor: "GreenScape", description: "Landscaping", amount: 280 },
];

const COLORS = ["oklch(0.62_0.18_260)", "oklch(0.65_0.15_180)", "oklch(0.7_0.16_75)", "oklch(0.6_0.18_25)", "oklch(0.55_0.16_300)"];

function ExpensesPage() {
  const remote = useApiList<any>(ENDPOINTS.expenses);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    category: "Maintenance",
    property: "",
    vendor: "",
    description: "",
    amount: 0,
  });
  const [local, setLocal] = useState<ExpenseRow[]>([]);

  const rows: ExpenseRow[] = useMemo(() => {
    const remoteRows = (remote.data ?? []).map((e: any, i: number) => ({
      id: String(e.id ?? e.expense_id ?? `r${i}`),
      date: e.date ?? e.created_at ?? "",
      category: e.category ?? "Other",
      property: e.property ?? e.property_name ?? "—",
      vendor: e.vendor ?? "—",
      description: e.description ?? e.notes ?? "",
      amount: Number(e.amount ?? 0),
    }));
    const base = remoteRows.length ? remoteRows : FALLBACK;
    return [...local, ...base];
  }, [remote.data, local]);

  const total = rows.reduce((s, r) => s + r.amount, 0);
  const byCategory = useMemo(() => {
    const m = new Map<string, number>();
    rows.forEach((r) => m.set(r.category, (m.get(r.category) || 0) + r.amount));
    return Array.from(m.entries()).map(([name, value]) => ({ name, value }));
  }, [rows]);
  const byMonth = useMemo(() => {
    const m = new Map<string, number>();
    rows.forEach((r) => {
      const k = (r.date || "").slice(0, 7) || "Unknown";
      m.set(k, (m.get(k) || 0) + r.amount);
    });
    return Array.from(m.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, amount]) => ({ month, amount }));
  }, [rows]);

  const submit = async () => {
    if (!form.amount || !form.description.trim()) {
      toast.error("Description and amount are required");
      return;
    }
    setSaving(true);
    try {
      await apiPost(ENDPOINTS.addExpense, form);
      toast.success("Expense recorded");
      remote.reload();
    } catch (e: any) {
      toast.warning(`Saved locally — ${e.message}`);
      setLocal((l) => [{ ...form, id: `local-${Date.now()}`, amount: Number(form.amount) }, ...l]);
    } finally {
      setSaving(false);
      setOpen(false);
    }
  };

  const fmt = (n: number) => `$${n.toLocaleString()}`;

  const columns: Column<ExpenseRow>[] = [
    { key: "date", label: "Date", className: "text-muted-foreground tabular-nums" },
    { key: "category", label: "Category", render: (r) => <span className="font-medium">{r.category}</span> },
    { key: "property", label: "Property", hideOnMobile: true },
    { key: "vendor", label: "Vendor", hideOnMobile: true },
    { key: "description", label: "Description", className: "text-muted-foreground" },
    {
      key: "amount",
      label: "Amount",
      className: "text-right font-medium tabular-nums",
      render: (r) => <span className="text-right block">{fmt(r.amount)}</span>,
    },
  ];

  const categories = Array.from(new Set(rows.map((r) => r.category)));
  const properties = Array.from(new Set(rows.map((r) => r.property)));

  return (
    <AppLayout allow={["landlord", "super_admin", "staff"]}>
      <div className="space-y-6 max-w-7xl">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Expenses</h1>
            <p className="text-muted-foreground mt-1">
              Track operational costs across your portfolio
            </p>
          </div>
          <Button onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4 mr-2" /> Log expense
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total expenses" value={fmt(total)} icon={Wallet} />
          <StatCard
            label="This month"
            value={fmt(byMonth[byMonth.length - 1]?.amount ?? 0)}
            icon={TrendingDown}
            tone="warning"
          />
          <StatCard label="Entries" value={String(rows.length)} icon={Receipt} />
          <StatCard label="Properties" value={String(properties.length)} icon={Building2} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="p-5 shadow-[var(--shadow-card)] lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Monthly expenses</h3>
              <span className="text-xs text-muted-foreground">{byMonth.length} months</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={byMonth}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v: any) => fmt(Number(v))} />
                  <Bar dataKey="amount" fill="oklch(0.6 0.18 25)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card className="p-5 shadow-[var(--shadow-card)]">
            <h3 className="font-semibold mb-4">By category</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={byCategory} dataKey="value" nameKey="name" innerRadius={45} outerRadius={80}>
                    {byCategory.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: any) => fmt(Number(v))} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <DataTable<ExpenseRow>
          rows={rows}
          columns={columns}
          loading={remote.loading && rows.length === 0}
          error={remote.error}
          onRetry={remote.reload}
          searchKeys={["category", "vendor", "description", "property"]}
          searchPlaceholder="Search expenses…"
          filters={[
            { key: "category", label: "Category", options: categories.map((c) => ({ value: c, label: c })) },
            { key: "property", label: "Property", options: properties.map((p) => ({ value: p, label: p })) },
          ]}
          empty="No expenses yet."
        />

        <FormModal
          open={open}
          onOpenChange={setOpen}
          title="Log expense"
          description="Record a new operational expense."
          submitLabel={saving ? "Saving…" : "Save expense"}
          onSubmit={submit}
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Date</Label>
              <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
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
              <Label>Category</Label>
              <select
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {["Maintenance", "Utilities", "Insurance", "Cleaning", "Tax", "Other"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Property</Label>
              <Input
                value={form.property}
                onChange={(e) => setForm({ ...form, property: e.target.value })}
                placeholder="Riverside Apartments"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Vendor</Label>
            <Input value={form.vendor} onChange={(e) => setForm({ ...form, vendor: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Input
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="What was this expense for?"
            />
          </div>
        </FormModal>
      </div>
    </AppLayout>
  );
}
