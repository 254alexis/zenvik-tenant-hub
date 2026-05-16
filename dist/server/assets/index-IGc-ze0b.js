import { U as jsxRuntimeExports } from "./worker-entry-_ixL3x3g.js";
import { B as Button, l as Link, C as Card, k as CircleCheck, T as TriangleAlert } from "./router-DMGhHKXf.js";
import { A as AppLayout, d as Badge, S as ShieldCheck, U as Users, H as House, e as Activity } from "./AppLayout--GaIKNag.js";
import { S as StatCard } from "./StatCard-DCCD8IS2.js";
import { A as AdminChartCard } from "./AdminChartCard-D6mI0Swf.js";
import { B as Building2 } from "./api-ySu1tSp5.js";
import { D as DollarSign } from "./dollar-sign-CQAHdfY4.js";
import { T as TrendingUp } from "./trending-up-gve5kwFL.js";
import { A as ArrowUpRight } from "./arrow-up-right-CtD_yUzr.js";
import { R as ResponsiveContainer, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, m as Cell, q as Legend } from "./generateCategoricalChart-wuWYSDUJ.js";
import { A as AreaChart } from "./AreaChart-BpzbveGE.js";
import { A as Area } from "./Area-DEOuxxT7.js";
import { L as Line } from "./Line-DFRFjCv7.js";
import { P as PieChart, a as Pie } from "./PieChart-xwylbeOt.js";
import { L as LineChart } from "./LineChart-CNJ2r8H7.js";
import { S as Server } from "./server-CgD6g5eN.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const REVENUE = [{
  month: "Jan",
  mrr: 18400,
  new: 2200
}, {
  month: "Feb",
  mrr: 20100,
  new: 2600
}, {
  month: "Mar",
  mrr: 22850,
  new: 2400
}, {
  month: "Apr",
  mrr: 25600,
  new: 3100
}, {
  month: "May",
  mrr: 28900,
  new: 3700
}, {
  month: "Jun",
  mrr: 32400,
  new: 4100
}, {
  month: "Jul",
  mrr: 35800,
  new: 3900
}, {
  month: "Aug",
  mrr: 39600,
  new: 4500
}];
const GROWTH = [{
  month: "Mar",
  landlords: 84,
  tenants: 1240
}, {
  month: "Apr",
  landlords: 92,
  tenants: 1410
}, {
  month: "May",
  landlords: 101,
  tenants: 1580
}, {
  month: "Jun",
  landlords: 108,
  tenants: 1720
}, {
  month: "Jul",
  landlords: 113,
  tenants: 1865
}, {
  month: "Aug",
  landlords: 118,
  tenants: 2014
}];
const PLAN_MIX = [{
  name: "Starter",
  value: 48
}, {
  name: "Growth",
  value: 41
}, {
  name: "Scale",
  value: 22
}, {
  name: "Enterprise",
  value: 7
}];
const PIE_COLORS = ["oklch(0.55 0.18 260)", "oklch(0.68 0.17 200)", "oklch(0.7 0.16 160)", "oklch(0.78 0.16 75)"];
const workspaces = [{
  name: "Riverside Holdings",
  plan: "Scale",
  landlords: 4,
  properties: 18,
  status: "Active"
}, {
  name: "Northgate Estates",
  plan: "Growth",
  landlords: 2,
  properties: 11,
  status: "Active"
}, {
  name: "Hillside Realty",
  plan: "Starter",
  landlords: 1,
  properties: 6,
  status: "Trial"
}, {
  name: "Eastview Group",
  plan: "Growth",
  landlords: 3,
  properties: 14,
  status: "Active"
}, {
  name: "Summit Residential",
  plan: "Enterprise",
  landlords: 8,
  properties: 42,
  status: "Active"
}];
function AdminOverview() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { allow: ["super_admin"], children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 max-w-7xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-semibold tracking-tight", children: "Platform overview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Global analytics across all workspaces." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-[oklch(0.7_0.16_160)]" }),
          "All systems normal"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/reports", children: "View revenue" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Workspaces", value: "42", delta: "+3 this month", icon: ShieldCheck, tone: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total landlords", value: "118", delta: "+9 this month", icon: Users, tone: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total tenants", value: "2,014", delta: "+149 this month", icon: House, tone: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total properties", value: "612", delta: "Across 42 workspaces", icon: Building2 })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "MRR", value: "$39.6k", delta: "+9.5% vs last month", icon: DollarSign, tone: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "ARR", value: "$475k", delta: "Annualized", icon: TrendingUp, tone: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Net new revenue", value: "$4.5k", delta: "August", icon: ArrowUpRight, tone: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "API uptime", value: "99.98%", delta: "Last 30 days", icon: Activity, tone: "success" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AdminChartCard, { title: "Platform revenue", subtitle: "MRR and net new revenue", className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: REVENUE, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "mrr", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "5%", stopColor: "oklch(0.55 0.18 260)", stopOpacity: 0.4 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "95%", stopColor: "oklch(0.55 0.18 260)", stopOpacity: 0 })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "oklch(0.92 0 0)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "month", stroke: "oklch(0.55 0 0)", fontSize: 12 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "oklch(0.55 0 0)", fontSize: 12 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
          borderRadius: 8,
          border: "1px solid oklch(0.9 0 0)",
          fontSize: 12
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "mrr", stroke: "oklch(0.55 0.18 260)", fill: "url(#mrr)", strokeWidth: 2 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "new", stroke: "oklch(0.7 0.16 160)", strokeWidth: 2, dot: false })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AdminChartCard, { title: "Plan mix", subtitle: "Subscriptions by tier", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Pie, { data: PLAN_MIX, dataKey: "value", nameKey: "name", innerRadius: 55, outerRadius: 90, paddingAngle: 2, children: PLAN_MIX.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: PIE_COLORS[i % PIE_COLORS.length] }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
          borderRadius: 8,
          border: "1px solid oklch(0.9 0 0)",
          fontSize: 12
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { wrapperStyle: {
          fontSize: 12
        } })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AdminChartCard, { title: "Landlord & tenant growth", subtitle: "Cumulative counts across the platform", className: "lg:col-span-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: GROWTH, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "oklch(0.92 0 0)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "month", stroke: "oklch(0.55 0 0)", fontSize: 12 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "oklch(0.55 0 0)", fontSize: 12 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
          borderRadius: 8,
          border: "1px solid oklch(0.9 0 0)",
          fontSize: 12
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { wrapperStyle: {
          fontSize: 12
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "landlords", stroke: "oklch(0.55 0.18 260)", strokeWidth: 2, dot: {
          r: 3
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "tenants", stroke: "oklch(0.68 0.17 200)", strokeWidth: 2, dot: {
          r: 3
        } })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6 shadow-[var(--shadow-card)] lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Recent workspaces" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Tenant organizations on the platform" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/landlords", className: "text-sm text-primary inline-flex items-center gap-1 hover:underline", children: [
            "Manage ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-3 w-3" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: workspaces.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: t.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              t.landlords,
              " landlords · ",
              t.properties,
              " properties · ",
              t.plan
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: t.status === "Trial" ? "outline" : "secondary", children: t.status })
        ] }, t.name)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6 shadow-[var(--shadow-card)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "System health" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Live infrastructure" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3 text-sm", children: [{
          label: "API",
          status: "Operational",
          ok: true,
          meta: "120ms p95"
        }, {
          label: "Database",
          status: "Operational",
          ok: true,
          meta: "98% cache hit"
        }, {
          label: "Background jobs",
          status: "Degraded",
          ok: false,
          meta: "Queue +18s"
        }, {
          label: "Email delivery",
          status: "Operational",
          ok: true,
          meta: "99.4%"
        }, {
          label: "File storage",
          status: "Operational",
          ok: true,
          meta: "S3 us-east"
        }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            s.ok ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-[oklch(0.55_0.16_160)]" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-[oklch(0.65_0.16_75)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: s.label })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: s.meta })
        ] }, s.label)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", size: "sm", className: "w-full mt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/monitoring", children: "Open monitoring" }) })
      ] })
    ] })
  ] }) });
}
export {
  AdminOverview as component
};
