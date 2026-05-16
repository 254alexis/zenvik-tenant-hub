import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-_ixL3x3g.js";
import { A as AppLayout, U as Users } from "./AppLayout--GaIKNag.js";
import { S as StatCard } from "./StatCard-DCCD8IS2.js";
import { u as useStore, T as TriangleAlert, o as Clock, C as Card, D as DataTable, S as StatusBadge, B as Button, t as toast } from "./router-DMGhHKXf.js";
import { u as useApiList, E as ENDPOINTS } from "./apiClient-BKY6RsTL.js";
import { D as DollarSign } from "./dollar-sign-CQAHdfY4.js";
import { R as ResponsiveContainer, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip } from "./generateCategoricalChart-wuWYSDUJ.js";
import { A as AreaChart } from "./AreaChart-BpzbveGE.js";
import { A as Area } from "./Area-DEOuxxT7.js";
import { L as LineChart } from "./LineChart-CNJ2r8H7.js";
import { L as Line } from "./Line-DFRFjCv7.js";
import { M as Mail } from "./mail-VPrjysX9.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./api-ySu1tSp5.js";
function daysSince(date) {
  if (!date) return 0;
  const d = new Date(date).getTime();
  if (isNaN(d)) return 0;
  return Math.max(0, Math.floor((Date.now() - d) / 864e5));
}
function ArrearsPage() {
  const {
    data: store
  } = useStore();
  const remoteInvoices = useApiList(ENDPOINTS.invoices);
  const remoteArrears = useApiList(ENDPOINTS.arrears);
  const rows = reactExports.useMemo(() => {
    const remoteRows = (remoteInvoices.data ?? []).filter((i) => {
      const s = String(i.status ?? "").toLowerCase();
      return s === "overdue" || s === "pending";
    }).map((i, idx) => {
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
        status: days > 0 ? "overdue" : "pending"
      };
    });
    if (remoteRows.length) return remoteRows;
    return store.invoices.filter((i) => i.status !== "paid").map((i) => {
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
        status: i.status === "overdue" || days > 0 ? "overdue" : "pending"
      };
    });
  }, [remoteInvoices.data, store]);
  const totalOverdue = rows.filter((r) => r.status === "overdue").reduce((s, r) => s + r.amount, 0);
  const totalPending = rows.filter((r) => r.status === "pending").reduce((s, r) => s + r.amount, 0);
  const tenantsAffected = new Set(rows.map((r) => r.tenant)).size;
  const avgDays = rows.length ? Math.round(rows.reduce((s, r) => s + r.days_overdue, 0) / rows.length) : 0;
  const trend = reactExports.useMemo(() => {
    const remote = (remoteArrears.data ?? []).map((p) => ({
      month: p.month ?? p.label ?? "",
      amount: Number(p.amount ?? p.value ?? 0)
    }));
    if (remote.length) return remote;
    return [{
      month: "Jun",
      amount: 1200
    }, {
      month: "Jul",
      amount: 1850
    }, {
      month: "Aug",
      amount: 1500
    }, {
      month: "Sep",
      amount: 2100
    }, {
      month: "Oct",
      amount: 2400
    }, {
      month: "Nov",
      amount: totalOverdue || 2800
    }];
  }, [remoteArrears.data, totalOverdue]);
  const buckets = reactExports.useMemo(() => {
    const b = {
      "0-30": 0,
      "31-60": 0,
      "61-90": 0,
      "90+": 0
    };
    rows.forEach((r) => {
      if (r.days_overdue <= 30) b["0-30"] += r.amount;
      else if (r.days_overdue <= 60) b["31-60"] += r.amount;
      else if (r.days_overdue <= 90) b["61-90"] += r.amount;
      else b["90+"] += r.amount;
    });
    return Object.entries(b).map(([range, amount]) => ({
      range,
      amount
    }));
  }, [rows]);
  const fmt = (n) => `$${n.toLocaleString()}`;
  const columns = [{
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
    key: "due",
    label: "Due",
    className: "text-muted-foreground tabular-nums"
  }, {
    key: "days_overdue",
    label: "Days late",
    render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `tabular-nums font-medium ${r.days_overdue > 60 ? "text-[oklch(0.55_0.2_25)]" : r.days_overdue > 30 ? "text-[oklch(0.6_0.16_75)]" : "text-muted-foreground"}`, children: [
      r.days_overdue,
      "d"
    ] })
  }, {
    key: "status",
    label: "Status",
    render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: r.status })
  }, {
    key: "amount",
    label: "Balance",
    className: "text-right font-semibold tabular-nums",
    render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-right", children: fmt(r.amount) })
  }, {
    key: "actions",
    label: "",
    className: "text-right",
    render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: (e) => {
      e.stopPropagation();
      toast.success(`Reminder sent to ${r.tenant}`);
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-3.5 w-3.5 mr-1.5" }),
      " Remind"
    ] })
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { allow: ["landlord", "super_admin", "staff"], children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-7xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-semibold tracking-tight", children: "Arrears" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Outstanding rent and overdue balances across all tenants" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total overdue", value: fmt(totalOverdue), icon: TriangleAlert, tone: "warning" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Pending", value: fmt(totalPending), icon: Clock }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Tenants affected", value: String(tenantsAffected), icon: Users }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Avg days late", value: `${avgDays}d`, icon: DollarSign, tone: "warning" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 shadow-[var(--shadow-card)] lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Arrears trend" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "last 6 months" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: trend, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "arrearsFill", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "oklch(0.6 0.18 25)", stopOpacity: 0.35 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "oklch(0.6 0.18 25)", stopOpacity: 0 })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", opacity: 0.3 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "month", tick: {
            fontSize: 11
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: {
            fontSize: 11
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (v) => fmt(Number(v)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "amount", stroke: "oklch(0.55 0.2 25)", strokeWidth: 2, fill: "url(#arrearsFill)" })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 shadow-[var(--shadow-card)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-4", children: "Aging buckets" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: buckets, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", opacity: 0.3 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "range", tick: {
            fontSize: 11
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: {
            fontSize: 11
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (v) => fmt(Number(v)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "amount", stroke: "oklch(0.55 0.2 25)", strokeWidth: 2, dot: {
            r: 4
          } })
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DataTable, { rows, columns, loading: remoteInvoices.loading && rows.length === 0, error: remoteInvoices.error, onRetry: remoteInvoices.reload, searchKeys: ["tenant", "unit", "invoice_id"], searchPlaceholder: "Search tenants or invoices…", filters: [{
      key: "status",
      label: "Status",
      options: [{
        value: "overdue",
        label: "Overdue"
      }, {
        value: "pending",
        label: "Pending"
      }]
    }], empty: "No outstanding balances. 🎉" })
  ] }) });
}
export {
  ArrearsPage as component
};
