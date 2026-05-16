import { U as jsxRuntimeExports } from "./worker-entry-_ixL3x3g.js";
import { c as createLucideIcon, B as Button, G as RefreshCw, C as Card, l as Link, H as Skeleton } from "./router-DMGhHKXf.js";
import { A as AppLayout, B as Bell, C as CreditCard } from "./AppLayout--GaIKNag.js";
import { S as StatCard } from "./StatCard-DCCD8IS2.js";
import { E as ErrorState } from "./DataStates-VT2v4C78.js";
import { u as useApiList } from "./apiClient-BKY6RsTL.js";
import { T as TrendingUp } from "./trending-up-gve5kwFL.js";
import { T as TrendingDown } from "./trending-down-7wsJIfdK.js";
import { R as ResponsiveContainer, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, m as Cell, q as Legend, B as Bar } from "./generateCategoricalChart-wuWYSDUJ.js";
import { A as AreaChart } from "./AreaChart-BpzbveGE.js";
import { A as Area } from "./Area-DEOuxxT7.js";
import { P as PieChart, a as Pie } from "./PieChart-xwylbeOt.js";
import { B as BarChart } from "./BarChart-B6blxy3Z.js";
import { A as ArrowUpRight } from "./arrow-up-right-CtD_yUzr.js";
import { B as Building2 } from "./api-ySu1tSp5.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./loader-circle-CfSvM4e-.js";
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "M9 9h.01", key: "1q5me6" }],
  ["path", { d: "M15 15h.01", key: "lqbp3k" }]
];
const CirclePercent = createLucideIcon("circle-percent", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const FileExclamationPoint = createLucideIcon("file-exclamation-point", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z",
      key: "1piglc"
    }
  ],
  ["path", { d: "M16 10h.01", key: "1m94wz" }],
  ["path", { d: "M2 8v1a2 2 0 0 0 2 2h1", key: "1env43" }]
];
const PiggyBank = createLucideIcon("piggy-bank", __iconNode);
const FALLBACK_FINANCE = [{
  month: "Jan",
  revenue: 38200,
  expenses: 12100
}, {
  month: "Feb",
  revenue: 41500,
  expenses: 11800
}, {
  month: "Mar",
  revenue: 39800,
  expenses: 13050
}, {
  month: "Apr",
  revenue: 44200,
  expenses: 12600
}, {
  month: "May",
  revenue: 46100,
  expenses: 14300
}, {
  month: "Jun",
  revenue: 48200,
  expenses: 13950
}];
const FALLBACK_OCCUPANCY = [{
  name: "Occupied",
  value: 34
}, {
  name: "Vacant",
  value: 4
}];
const FALLBACK_NOTIFICATIONS = [{
  id: 1,
  title: "Invoice #1042 marked as paid",
  created_at: "2h ago",
  read: 0
}, {
  id: 2,
  title: "New tenant application received",
  created_at: "5h ago",
  read: 0
}, {
  id: 3,
  title: "Maintenance task completed at Apt 7A",
  created_at: "1d ago",
  read: 1
}, {
  id: 4,
  title: "Lease renewal due for Marcus Webb",
  created_at: "2d ago",
  read: 1
}];
const PRIMARY = "oklch(0.55 0.18 250)";
const SUCCESS = "oklch(0.6 0.15 160)";
const DANGER = "oklch(0.62 0.2 25)";
const MUTED = "oklch(0.78 0.05 250)";
const fmt = (n) => n >= 1e3 ? `$${(n / 1e3).toFixed(n >= 1e4 ? 0 : 1)}k` : `$${n.toFixed(0)}`;
const fmtFull = (n) => `$${n.toLocaleString()}`;
function ChartCard({
  title,
  subtitle,
  children,
  className,
  loading,
  error,
  onRetry
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: `p-6 shadow-[var(--shadow-card)] ${className ?? ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex items-start justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: title }),
      subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: subtitle })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-full w-full rounded-md" }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, { message: error, onRetry }) : children })
  ] });
}
function KpiSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6 shadow-[var(--shadow-card)] border-border/60", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-32 mt-3" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20 mt-2" })
  ] });
}
function LandlordDashboard() {
  const finance = useApiList("/analytics/finance.php");
  const occupancy = useApiList("/analytics/occupancy.php");
  const notifications = useApiList("/notifications/list.php");
  const usingFallbackFinance = !finance.loading && (!finance.data || finance.data.length === 0);
  const usingFallbackOccupancy = !occupancy.loading && (!occupancy.data || occupancy.data.length === 0);
  const financeData = (usingFallbackFinance ? FALLBACK_FINANCE : (finance.data ?? []).map((r) => ({
    month: r.month ?? r.label ?? r.period ?? "",
    revenue: Number(r.revenue ?? r.income ?? 0),
    expenses: Number(r.expenses ?? r.expense ?? r.cost ?? 0)
  }))).map((r) => ({
    ...r,
    profit: r.revenue - r.expenses
  }));
  const occupancyData = usingFallbackOccupancy ? FALLBACK_OCCUPANCY : (occupancy.data ?? []).map((o) => ({
    name: o.name ?? o.label ?? o.status ?? "",
    value: Number(o.value ?? o.count ?? 0)
  }));
  const notificationsData = !notifications.loading && (!notifications.data || notifications.data.length === 0) ? FALLBACK_NOTIFICATIONS : (notifications.data ?? []).map((n) => ({
    id: n.id ?? n.notification_id ?? Math.random(),
    title: n.title ?? n.message ?? n.body ?? "Notification",
    created_at: n.created_at ?? n.date ?? n.time ?? "",
    read: Number(n.read ?? n.is_read ?? 0)
  }));
  const totalRevenue = financeData.reduce((s, r) => s + r.revenue, 0);
  const totalExpenses = financeData.reduce((s, r) => s + r.expenses, 0);
  const netProfit = totalRevenue - totalExpenses;
  const occupied = occupancyData.find((o) => /occup/i.test(o.name))?.value ?? 0;
  const totalUnits = occupancyData.reduce((s, o) => s + o.value, 0);
  const occupancyRate = totalUnits ? Math.round(occupied / totalUnits * 100) : 0;
  const lastMonth = financeData[financeData.length - 1];
  const prevMonth = financeData[financeData.length - 2];
  const revenueDelta = prevMonth && prevMonth.revenue ? Math.round((lastMonth.revenue - prevMonth.revenue) / prevMonth.revenue * 100) : 0;
  const expenseDelta = prevMonth && prevMonth.expenses ? Math.round((lastMonth.expenses - prevMonth.expenses) / prevMonth.expenses * 100) : 0;
  const pendingInvoices = notificationsData.filter((n) => /invoice|pending|overdue|unpaid/i.test(n.title)).length || 7;
  const reloadAll = () => {
    finance.reload();
    occupancy.reload();
    notifications.reload();
  };
  const kpisLoading = finance.loading || occupancy.loading;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { allow: ["landlord"], children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 max-w-7xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-semibold tracking-tight", children: "Portfolio overview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Real-time revenue, expenses and occupancy across your portfolio." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: reloadAll, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4" }),
        "Refresh"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4", children: kpisLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiSkeleton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiSkeleton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiSkeleton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiSkeleton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiSkeleton, {})
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total revenue", value: fmtFull(totalRevenue), delta: `${revenueDelta >= 0 ? "+" : ""}${revenueDelta}% MoM`, icon: TrendingUp, tone: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total expenses", value: fmtFull(totalExpenses), delta: `${expenseDelta >= 0 ? "+" : ""}${expenseDelta}% MoM`, icon: TrendingDown, tone: "warning" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Net profit", value: fmtFull(netProfit), delta: `Margin ${totalRevenue ? Math.round(netProfit / totalRevenue * 100) : 0}%`, icon: PiggyBank, tone: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Occupancy rate", value: `${occupancyRate}%`, delta: `${occupied}/${totalUnits} units`, icon: CirclePercent }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Pending invoices", value: String(pendingInvoices), delta: "Awaiting payment", icon: FileExclamationPoint, tone: "warning" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Monthly income", subtitle: "Revenue trend over time", className: "lg:col-span-2", loading: finance.loading, error: finance.error, onRetry: finance.reload, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: financeData, margin: {
        top: 8,
        right: 8,
        bottom: 0,
        left: -10
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "rev", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: PRIMARY, stopOpacity: 0.35 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: PRIMARY, stopOpacity: 0 })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "oklch(0.92 0 0)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "month", stroke: "oklch(0.55 0 0)", fontSize: 12 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "oklch(0.55 0 0)", fontSize: 12, tickFormatter: fmt }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (v) => fmtFull(v), contentStyle: {
          borderRadius: 8,
          border: "1px solid oklch(0.9 0 0)",
          fontSize: 12
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "revenue", stroke: PRIMARY, strokeWidth: 2, fill: "url(#rev)" })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Occupancy", subtitle: "Occupied vs vacant", loading: occupancy.loading, error: occupancy.error, onRetry: occupancy.reload, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Pie, { data: occupancyData, dataKey: "value", nameKey: "name", innerRadius: 55, outerRadius: 85, paddingAngle: 2, children: occupancyData.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: i === 0 ? PRIMARY : MUTED }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
          borderRadius: 8,
          border: "1px solid oklch(0.9 0 0)",
          fontSize: 12
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { wrapperStyle: {
          fontSize: 12
        } })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Expenses", subtitle: "Monthly operating costs", className: "lg:col-span-2", loading: finance.loading, error: finance.error, onRetry: finance.reload, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: financeData, margin: {
        top: 8,
        right: 8,
        bottom: 0,
        left: -10
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "oklch(0.92 0 0)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "month", stroke: "oklch(0.55 0 0)", fontSize: 12 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "oklch(0.55 0 0)", fontSize: 12, tickFormatter: fmt }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (v) => fmtFull(v), contentStyle: {
          borderRadius: 8,
          border: "1px solid oklch(0.9 0 0)",
          fontSize: 12
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "expenses", fill: DANGER, radius: [6, 6, 0, 0], maxBarSize: 36 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "profit", fill: SUCCESS, radius: [6, 6, 0, 0], maxBarSize: 36 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { wrapperStyle: {
          fontSize: 12
        } })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6 shadow-[var(--shadow-card)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4" }),
              " Notifications"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Latest activity" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/notifications", className: "text-xs text-primary inline-flex items-center gap-1 hover:underline", children: [
            "View all ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-3 w-3" })
          ] })
        ] }),
        notifications.loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: Array.from({
          length: 4
        }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/3" })
        ] }, i)) }) : notifications.error ? /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, { message: notifications.error, onRetry: notifications.reload }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border -mx-2", children: notificationsData.slice(0, 6).map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "px-2 py-3 flex items-start gap-3 hover:bg-secondary/40 rounded-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `mt-1.5 h-2 w-2 rounded-full shrink-0 ${n.read ? "bg-muted" : "bg-primary"}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium truncate", children: n.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: n.created_at || "Just now" })
          ] })
        ] }, n.id)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2", children: [{
      to: "/properties",
      label: "Properties",
      icon: Building2
    }, {
      to: "/invoices",
      label: "Invoices",
      icon: FileExclamationPoint
    }, {
      to: "/payments",
      label: "Payments",
      icon: CreditCard
    }, {
      to: "/tenants",
      label: "Tenants",
      icon: CirclePercent
    }].map(({
      to,
      label,
      icon: Icon
    }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to, className: "group flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-secondary/60 transition-colors", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-md bg-secondary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: label })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" })
    ] }, to)) })
  ] }) });
}
export {
  LandlordDashboard as component
};
