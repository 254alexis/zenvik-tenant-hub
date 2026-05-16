import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-_ixL3x3g.js";
import { A as AppLayout, C as CreditCard } from "./AppLayout--GaIKNag.js";
import { S as StatCard } from "./StatCard-DCCD8IS2.js";
import { c as createLucideIcon, u as useStore, B as Button, P as Plus, C as Card, D as DataTable, F as FormModal, L as Label, I as Input, n as Download, t as toast } from "./router-DMGhHKXf.js";
import { u as useApiList, E as ENDPOINTS, a as apiPost } from "./apiClient-BKY6RsTL.js";
import { d as downloadReceipt } from "./receipt-BFHhi2Sh.js";
import { T as TrendingUp } from "./trending-up-gve5kwFL.js";
import { R as ResponsiveContainer, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, B as Bar } from "./generateCategoricalChart-wuWYSDUJ.js";
import { B as BarChart } from "./BarChart-B6blxy3Z.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./api-ySu1tSp5.js";
const __iconNode$1 = [
  ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "2", key: "9lu3g6" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ["path", { d: "M6 12h.01M18 12h.01", key: "113zkx" }]
];
const Banknote = createLucideIcon("banknote", __iconNode$1);
const __iconNode = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode);
function PaymentsPage() {
  const {
    data: store,
    recordPayment
  } = useStore();
  const remote = useApiList(ENDPOINTS.payments);
  const [open, setOpen] = reactExports.useState(false);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const unpaid = store.invoices.filter((i) => i.status !== "paid");
  const [form, setForm] = reactExports.useState({
    invoice_id: unpaid[0]?.id || "",
    amount: unpaid[0]?.amount || 0,
    method: "Card",
    date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
  });
  const rows = reactExports.useMemo(() => {
    const remoteRows = (remote.data ?? []).map((p, i) => {
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
        method: p.method ?? "—"
      };
    });
    if (remoteRows.length) return remoteRows;
    return store.payments.map((p) => {
      const tenant = store.tenants.find((t) => t.id === p.tenant_id);
      const unit = tenant ? store.units.find((u) => u.id === tenant.unit_id) : null;
      return {
        ...p,
        tenant: tenant?.name ?? "—",
        unit: unit?.label ?? "—"
      };
    });
  }, [remote.data, store]);
  const totals = reactExports.useMemo(() => {
    const total = rows.reduce((s, r) => s + r.amount, 0);
    const month = (/* @__PURE__ */ new Date()).toISOString().slice(0, 7);
    const thisMonth = rows.filter((r) => (r.date || "").startsWith(month)).reduce((s, r) => s + r.amount, 0);
    return {
      total,
      thisMonth,
      count: rows.length
    };
  }, [rows]);
  const byMonth = reactExports.useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    rows.forEach((r) => {
      const k = (r.date || "").slice(0, 7) || "—";
      m.set(k, (m.get(k) || 0) + r.amount);
    });
    return Array.from(m.entries()).sort(([a], [b]) => a.localeCompare(b)).slice(-6).map(([month, amount]) => ({
      month,
      amount
    }));
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
        date: form.date
      });
      toast.success("Payment recorded");
      remote.reload();
    } catch (e) {
      toast.warning(`Saved locally — ${e.message}`);
      recordPayment({
        tenant_id: inv.tenant_id,
        invoice_id: inv.id,
        amount: Number(form.amount),
        method: form.method,
        date: form.date
      });
    } finally {
      setSubmitting(false);
      setOpen(false);
    }
  };
  const fmt = (n) => `$${n.toLocaleString()}`;
  const columns = [{
    key: "id",
    label: "Receipt",
    className: "font-mono text-xs"
  }, {
    key: "date",
    label: "Date",
    className: "text-muted-foreground tabular-nums"
  }, {
    key: "tenant",
    label: "Tenant",
    render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: r.tenant })
  }, {
    key: "unit",
    label: "Unit",
    className: "text-muted-foreground",
    hideOnMobile: true
  }, {
    key: "invoice_id",
    label: "Invoice",
    className: "font-mono text-xs",
    hideOnMobile: true
  }, {
    key: "method",
    label: "Method",
    className: "text-muted-foreground"
  }, {
    key: "amount",
    label: "Amount",
    className: "text-right font-semibold tabular-nums",
    render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-right", children: fmt(r.amount) })
  }, {
    key: "actions",
    label: "",
    className: "text-right",
    render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: (e) => {
      e.stopPropagation();
      downloadReceipt({
        id: r.id,
        date: r.date,
        tenant: r.tenant,
        unit: r.unit,
        invoice_id: r.invoice_id,
        method: r.method,
        amount: r.amount
      });
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5 mr-1.5" }),
      " Receipt"
    ] })
  }];
  const methods = Array.from(new Set(rows.map((r) => r.method)));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { allow: ["landlord", "super_admin", "tenant"], children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-7xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-semibold tracking-tight", children: "Payments" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-1", children: [
          totals.count,
          " transactions · ",
          fmt(totals.total),
          " collected"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setOpen(true), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
        " Record payment"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total collected", value: fmt(totals.total), icon: CreditCard, tone: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "This month", value: fmt(totals.thisMonth), icon: TrendingUp, tone: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Transactions", value: String(totals.count), icon: Calendar }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Avg payment", value: fmt(totals.count ? Math.round(totals.total / totals.count) : 0), icon: Banknote })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 shadow-[var(--shadow-card)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Cash inflow" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "Last ",
          byMonth.length || 0,
          " months"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: byMonth, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", opacity: 0.3 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "month", tick: {
          fontSize: 11
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: {
          fontSize: 11
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (v) => fmt(Number(v)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "amount", fill: "oklch(0.55 0.16 160)", radius: [6, 6, 0, 0] })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DataTable, { rows, columns, loading: remote.loading && rows.length === 0, error: remote.error, onRetry: remote.reload, searchKeys: ["tenant", "id", "invoice_id", "method"], searchPlaceholder: "Search payments…", filters: methods.length ? [{
      key: "method",
      label: "Method",
      options: methods.map((m) => ({
        value: m,
        label: m
      }))
    }] : void 0, empty: "No payments recorded yet." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(FormModal, { open, onOpenChange: setOpen, title: "Record payment", submitLabel: submitting ? "Saving…" : "Save", onSubmit: submit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Invoice" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "w-full h-10 rounded-md border border-input bg-background px-3 text-sm", value: form.invoice_id, onChange: (e) => {
          const inv = store.invoices.find((i) => i.id === e.target.value);
          setForm({
            ...form,
            invoice_id: e.target.value,
            amount: inv?.amount ?? 0
          });
        }, children: [
          unpaid.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "No unpaid invoices" }),
          unpaid.map((i) => {
            const t = store.tenants.find((x) => x.id === i.tenant_id);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: i.id, children: [
              i.id,
              " · ",
              t?.name,
              " · $",
              i.amount
            ] }, i.id);
          })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 0, value: form.amount, onChange: (e) => setForm({
            ...form,
            amount: Number(e.target.value)
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Method" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "w-full h-10 rounded-md border border-input bg-background px-3 text-sm", value: form.method, onChange: (e) => setForm({
            ...form,
            method: e.target.value
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Card" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Bank transfer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Cash" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Mobile money" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: form.date, onChange: (e) => setForm({
            ...form,
            date: e.target.value
          }) })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  PaymentsPage as component
};
