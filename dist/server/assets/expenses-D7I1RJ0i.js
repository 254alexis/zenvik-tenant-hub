import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-_ixL3x3g.js";
import { A as AppLayout, W as Wallet, R as Receipt } from "./AppLayout--GaIKNag.js";
import { S as StatCard } from "./StatCard-DCCD8IS2.js";
import { B as Button, P as Plus, C as Card, D as DataTable, F as FormModal, L as Label, I as Input, t as toast } from "./router-DMGhHKXf.js";
import { u as useApiList, E as ENDPOINTS, a as apiPost } from "./apiClient-BKY6RsTL.js";
import { T as TrendingDown } from "./trending-down-7wsJIfdK.js";
import { B as Building2 } from "./api-ySu1tSp5.js";
import { R as ResponsiveContainer, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, B as Bar, m as Cell, q as Legend } from "./generateCategoricalChart-wuWYSDUJ.js";
import { B as BarChart } from "./BarChart-B6blxy3Z.js";
import { P as PieChart, a as Pie } from "./PieChart-xwylbeOt.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const FALLBACK = [{
  id: "e1",
  date: "2025-11-04",
  category: "Maintenance",
  property: "Riverside",
  vendor: "QuickFix Plumbing",
  description: "Leak repair – Apt 4B",
  amount: 320
}, {
  id: "e2",
  date: "2025-11-02",
  category: "Utilities",
  property: "Northgate",
  vendor: "City Water Co.",
  description: "Water bill",
  amount: 540
}, {
  id: "e3",
  date: "2025-10-28",
  category: "Insurance",
  property: "Eastview",
  vendor: "Aegis Insurance",
  description: "Quarterly premium",
  amount: 1200
}, {
  id: "e4",
  date: "2025-10-15",
  category: "Cleaning",
  property: "Riverside",
  vendor: "BrightCo",
  description: "Common areas – October",
  amount: 450
}, {
  id: "e5",
  date: "2025-10-08",
  category: "Maintenance",
  property: "Northgate",
  vendor: "GreenScape",
  description: "Landscaping",
  amount: 280
}];
const COLORS = ["oklch(0.62_0.18_260)", "oklch(0.65_0.15_180)", "oklch(0.7_0.16_75)", "oklch(0.6_0.18_25)", "oklch(0.55_0.16_300)"];
function ExpensesPage() {
  const remote = useApiList(ENDPOINTS.expenses);
  const [open, setOpen] = reactExports.useState(false);
  const [saving, setSaving] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
    category: "Maintenance",
    property: "",
    vendor: "",
    description: "",
    amount: 0
  });
  const [local, setLocal] = reactExports.useState([]);
  const rows = reactExports.useMemo(() => {
    const remoteRows = (remote.data ?? []).map((e, i) => ({
      id: String(e.id ?? e.expense_id ?? `r${i}`),
      date: e.date ?? e.created_at ?? "",
      category: e.category ?? "Other",
      property: e.property ?? e.property_name ?? "—",
      vendor: e.vendor ?? "—",
      description: e.description ?? e.notes ?? "",
      amount: Number(e.amount ?? 0)
    }));
    const base = remoteRows.length ? remoteRows : FALLBACK;
    return [...local, ...base];
  }, [remote.data, local]);
  const total = rows.reduce((s, r) => s + r.amount, 0);
  const byCategory = reactExports.useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    rows.forEach((r) => m.set(r.category, (m.get(r.category) || 0) + r.amount));
    return Array.from(m.entries()).map(([name, value]) => ({
      name,
      value
    }));
  }, [rows]);
  const byMonth = reactExports.useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    rows.forEach((r) => {
      const k = (r.date || "").slice(0, 7) || "Unknown";
      m.set(k, (m.get(k) || 0) + r.amount);
    });
    return Array.from(m.entries()).sort(([a], [b]) => a.localeCompare(b)).map(([month, amount]) => ({
      month,
      amount
    }));
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
    } catch (e) {
      toast.warning(`Saved locally — ${e.message}`);
      setLocal((l) => [{
        ...form,
        id: `local-${Date.now()}`,
        amount: Number(form.amount)
      }, ...l]);
    } finally {
      setSaving(false);
      setOpen(false);
    }
  };
  const fmt = (n) => `$${n.toLocaleString()}`;
  const columns = [{
    key: "date",
    label: "Date",
    className: "text-muted-foreground tabular-nums"
  }, {
    key: "category",
    label: "Category",
    render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: r.category })
  }, {
    key: "property",
    label: "Property",
    hideOnMobile: true
  }, {
    key: "vendor",
    label: "Vendor",
    hideOnMobile: true
  }, {
    key: "description",
    label: "Description",
    className: "text-muted-foreground"
  }, {
    key: "amount",
    label: "Amount",
    className: "text-right font-medium tabular-nums",
    render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right block", children: fmt(r.amount) })
  }];
  const categories = Array.from(new Set(rows.map((r) => r.category)));
  const properties = Array.from(new Set(rows.map((r) => r.property)));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { allow: ["landlord", "super_admin", "staff"], children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-7xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-semibold tracking-tight", children: "Expenses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Track operational costs across your portfolio" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setOpen(true), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
        " Log expense"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total expenses", value: fmt(total), icon: Wallet }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "This month", value: fmt(byMonth[byMonth.length - 1]?.amount ?? 0), icon: TrendingDown, tone: "warning" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Entries", value: String(rows.length), icon: Receipt }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Properties", value: String(properties.length), icon: Building2 })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 shadow-[var(--shadow-card)] lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Monthly expenses" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            byMonth.length,
            " months"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: byMonth, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", opacity: 0.3 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "month", tick: {
            fontSize: 11
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: {
            fontSize: 11
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (v) => fmt(Number(v)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "amount", fill: "oklch(0.6 0.18 25)", radius: [6, 6, 0, 0] })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 shadow-[var(--shadow-card)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-4", children: "By category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pie, { data: byCategory, dataKey: "value", nameKey: "name", innerRadius: 45, outerRadius: 80, children: byCategory.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: COLORS[i % COLORS.length] }, i)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (v) => fmt(Number(v)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { wrapperStyle: {
            fontSize: 11
          } })
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DataTable, { rows, columns, loading: remote.loading && rows.length === 0, error: remote.error, onRetry: remote.reload, searchKeys: ["category", "vendor", "description", "property"], searchPlaceholder: "Search expenses…", filters: [{
      key: "category",
      label: "Category",
      options: categories.map((c) => ({
        value: c,
        label: c
      }))
    }, {
      key: "property",
      label: "Property",
      options: properties.map((p) => ({
        value: p,
        label: p
      }))
    }], empty: "No expenses yet." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(FormModal, { open, onOpenChange: setOpen, title: "Log expense", description: "Record a new operational expense.", submitLabel: saving ? "Saving…" : "Save expense", onSubmit: submit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: form.date, onChange: (e) => setForm({
            ...form,
            date: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 0, value: form.amount, onChange: (e) => setForm({
            ...form,
            amount: Number(e.target.value)
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: "w-full h-10 rounded-md border border-input bg-background px-3 text-sm", value: form.category, onChange: (e) => setForm({
            ...form,
            category: e.target.value
          }), children: ["Maintenance", "Utilities", "Insurance", "Cleaning", "Tax", "Other"].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: c }, c)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Property" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.property, onChange: (e) => setForm({
            ...form,
            property: e.target.value
          }), placeholder: "Riverside Apartments" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Vendor" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.vendor, onChange: (e) => setForm({
          ...form,
          vendor: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.description, onChange: (e) => setForm({
          ...form,
          description: e.target.value
        }), placeholder: "What was this expense for?" })
      ] })
    ] })
  ] }) });
}
export {
  ExpensesPage as component
};
