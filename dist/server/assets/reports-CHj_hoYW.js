import { U as jsxRuntimeExports } from "./worker-entry-_ixL3x3g.js";
import { A as AppLayout, W as Wallet } from "./AppLayout--GaIKNag.js";
import { S as StatCard } from "./StatCard-DCCD8IS2.js";
import { A as AdminChartCard } from "./AdminChartCard-D6mI0Swf.js";
import { D as DollarSign } from "./dollar-sign-CQAHdfY4.js";
import { T as TrendingUp } from "./trending-up-gve5kwFL.js";
import { T as TrendingDown } from "./trending-down-7wsJIfdK.js";
import { R as ResponsiveContainer, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, B as Bar, q as Legend } from "./generateCategoricalChart-wuWYSDUJ.js";
import { A as AreaChart } from "./AreaChart-BpzbveGE.js";
import { A as Area } from "./Area-DEOuxxT7.js";
import { B as BarChart } from "./BarChart-B6blxy3Z.js";
import { L as LineChart } from "./LineChart-CNJ2r8H7.js";
import { L as Line } from "./Line-DFRFjCv7.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./router-DMGhHKXf.js";
import "./api-ySu1tSp5.js";
const MRR = [{
  month: "Jan",
  mrr: 18400,
  churn: 420
}, {
  month: "Feb",
  mrr: 20100,
  churn: 510
}, {
  month: "Mar",
  mrr: 22850,
  churn: 380
}, {
  month: "Apr",
  mrr: 25600,
  churn: 610
}, {
  month: "May",
  mrr: 28900,
  churn: 540
}, {
  month: "Jun",
  mrr: 32400,
  churn: 720
}, {
  month: "Jul",
  mrr: 35800,
  churn: 690
}, {
  month: "Aug",
  mrr: 39600,
  churn: 810
}];
const PLAN_REV = [{
  plan: "Starter",
  revenue: 4800
}, {
  plan: "Growth",
  revenue: 14600
}, {
  plan: "Scale",
  revenue: 12200
}, {
  plan: "Enterprise",
  revenue: 8e3
}];
const CHANNELS = [{
  month: "Mar",
  direct: 7200,
  partner: 4100,
  referral: 2300
}, {
  month: "Apr",
  direct: 8400,
  partner: 5200,
  referral: 2700
}, {
  month: "May",
  direct: 9800,
  partner: 5900,
  referral: 3100
}, {
  month: "Jun",
  direct: 11200,
  partner: 7100,
  referral: 3600
}, {
  month: "Jul",
  direct: 12800,
  partner: 7800,
  referral: 4100
}, {
  month: "Aug",
  direct: 14600,
  partner: 9400,
  referral: 4800
}];
function AdminReports() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { allow: ["super_admin"], children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 max-w-7xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-semibold tracking-tight", children: "Revenue analytics" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Platform revenue, growth, and retention." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "MRR", value: "$39.6k", delta: "+9.5% MoM", icon: DollarSign, tone: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "ARR", value: "$475k", delta: "Annualized", icon: TrendingUp, tone: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "ARPU", value: "$335", delta: "+$12 vs last month", icon: Wallet, tone: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Churn", value: "2.1%", delta: "Net revenue churn", icon: TrendingDown, tone: "warning" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AdminChartCard, { title: "Monthly recurring revenue", subtitle: "MRR over the last 8 months", className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: MRR, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "rev", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "5%", stopColor: "oklch(0.55 0.18 260)", stopOpacity: 0.5 }),
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "mrr", stroke: "oklch(0.55 0.18 260)", fill: "url(#rev)", strokeWidth: 2 })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AdminChartCard, { title: "Revenue by plan", subtitle: "Monthly contribution", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: PLAN_REV, layout: "vertical", margin: {
        left: 20
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "oklch(0.92 0 0)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { type: "number", stroke: "oklch(0.55 0 0)", fontSize: 12 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { type: "category", dataKey: "plan", stroke: "oklch(0.55 0 0)", fontSize: 12, width: 80 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
          borderRadius: 8,
          border: "1px solid oklch(0.9 0 0)",
          fontSize: 12
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "revenue", fill: "oklch(0.55 0.18 260)", radius: [0, 6, 6, 0] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AdminChartCard, { title: "Revenue by channel", subtitle: "Direct, partner and referral revenue", className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: CHANNELS, children: [
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "direct", stackId: "a", fill: "oklch(0.55 0.18 260)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "partner", stackId: "a", fill: "oklch(0.68 0.17 200)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "referral", stackId: "a", fill: "oklch(0.78 0.16 75)", radius: [4, 4, 0, 0] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AdminChartCard, { title: "Churn trend", subtitle: "Lost revenue per month", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: MRR, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "oklch(0.92 0 0)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "month", stroke: "oklch(0.55 0 0)", fontSize: 12 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "oklch(0.55 0 0)", fontSize: 12 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
          borderRadius: 8,
          border: "1px solid oklch(0.9 0 0)",
          fontSize: 12
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "churn", stroke: "oklch(0.65 0.18 30)", strokeWidth: 2, dot: {
          r: 3
        } })
      ] }) }) })
    ] })
  ] }) });
}
export {
  AdminReports as component
};
