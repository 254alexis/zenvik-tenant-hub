import { U as jsxRuntimeExports } from "./worker-entry-_ixL3x3g.js";
import { A as AppLayout, d as Badge, e as Activity } from "./AppLayout--GaIKNag.js";
import { c as createLucideIcon, o as Clock, T as TriangleAlert, C as Card, k as CircleCheck } from "./router-DMGhHKXf.js";
import { S as StatCard } from "./StatCard-DCCD8IS2.js";
import { A as AdminChartCard } from "./AdminChartCard-D6mI0Swf.js";
import { R as ResponsiveContainer, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, B as Bar } from "./generateCategoricalChart-wuWYSDUJ.js";
import { L as LineChart } from "./LineChart-CNJ2r8H7.js";
import { L as Line } from "./Line-DFRFjCv7.js";
import { B as BarChart } from "./BarChart-B6blxy3Z.js";
import { A as AreaChart } from "./AreaChart-BpzbveGE.js";
import { A as Area } from "./Area-DEOuxxT7.js";
import { S as Server } from "./server-CgD6g5eN.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./api-ySu1tSp5.js";
const __iconNode$1 = [
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M17 20v2", key: "1rnc9c" }],
  ["path", { d: "M17 2v2", key: "11trls" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M2 17h2", key: "7oei6x" }],
  ["path", { d: "M2 7h2", key: "asdhe0" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "M20 17h2", key: "1fpfkl" }],
  ["path", { d: "M20 7h2", key: "1o8tra" }],
  ["path", { d: "M7 20v2", key: "4gnj0m" }],
  ["path", { d: "M7 2v2", key: "1i4yhu" }],
  ["rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", key: "1vbyd7" }],
  ["rect", { x: "8", y: "8", width: "8", height: "8", rx: "1", key: "z9xiuo" }]
];
const Cpu = createLucideIcon("cpu", __iconNode$1);
const __iconNode = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
];
const Database = createLucideIcon("database", __iconNode);
const LATENCY = Array.from({
  length: 24
}).map((_, i) => ({
  t: `${i}:00`,
  p50: 60 + Math.round(Math.sin(i / 2) * 15 + Math.random() * 10),
  p95: 140 + Math.round(Math.cos(i / 3) * 30 + Math.random() * 20)
}));
const REQUESTS = Array.from({
  length: 24
}).map((_, i) => ({
  t: `${i}:00`,
  ok: 4200 + Math.round(Math.sin(i / 3) * 800 + Math.random() * 400),
  err: Math.round(20 + Math.random() * 60)
}));
const ERRORS = [{
  code: "500",
  count: 142
}, {
  code: "502",
  count: 38
}, {
  code: "503",
  count: 21
}, {
  code: "404",
  count: 612
}, {
  code: "401",
  count: 184
}];
const SERVICES = [{
  name: "API gateway",
  status: "Operational",
  latency: "112ms",
  uptime: "99.99%",
  ok: true
}, {
  name: "Auth service",
  status: "Operational",
  latency: "44ms",
  uptime: "99.98%",
  ok: true
}, {
  name: "Postgres primary",
  status: "Operational",
  latency: "8ms",
  uptime: "99.99%",
  ok: true
}, {
  name: "Background workers",
  status: "Degraded",
  latency: "queue +18s",
  uptime: "99.71%",
  ok: false
}, {
  name: "Email (SES)",
  status: "Operational",
  latency: "—",
  uptime: "99.94%",
  ok: true
}, {
  name: "Object storage",
  status: "Operational",
  latency: "—",
  uptime: "99.99%",
  ok: true
}];
const INCIDENTS = [{
  when: "2h ago",
  title: "Background workers degraded",
  severity: "Minor"
}, {
  when: "Yesterday",
  title: "Scheduled DB maintenance",
  severity: "Info"
}, {
  when: "3 days ago",
  title: "Elevated 5xx on /invoices",
  severity: "Resolved"
}];
function AdminMonitoring() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { allow: ["super_admin"], children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 max-w-7xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between flex-wrap gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-semibold tracking-tight", children: "System monitoring" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Real-time health, performance, and incidents." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-[oklch(0.7_0.16_160)] animate-pulse" }),
        "Live"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "API uptime", value: "99.98%", delta: "Last 30 days", icon: Activity, tone: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "p95 latency", value: "142ms", delta: "-12ms vs yesterday", icon: Clock, tone: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Error rate", value: "0.42%", delta: "+0.05% vs avg", icon: TriangleAlert, tone: "warning" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "DB CPU", value: "38%", delta: "Healthy", icon: Cpu, tone: "success" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AdminChartCard, { title: "Request latency (24h)", subtitle: "p50 and p95 in ms", className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: LATENCY, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "oklch(0.92 0 0)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "t", stroke: "oklch(0.55 0 0)", fontSize: 11, interval: 2 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "oklch(0.55 0 0)", fontSize: 11 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
          borderRadius: 8,
          border: "1px solid oklch(0.9 0 0)",
          fontSize: 12
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "p50", stroke: "oklch(0.55 0.18 260)", strokeWidth: 2, dot: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "p95", stroke: "oklch(0.65 0.18 30)", strokeWidth: 2, dot: false })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AdminChartCard, { title: "Error breakdown", subtitle: "HTTP status (last 24h)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: ERRORS, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "oklch(0.92 0 0)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "code", stroke: "oklch(0.55 0 0)", fontSize: 12 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "oklch(0.55 0 0)", fontSize: 12 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
          borderRadius: 8,
          border: "1px solid oklch(0.9 0 0)",
          fontSize: 12
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "count", fill: "oklch(0.65 0.18 30)", radius: [6, 6, 0, 0] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AdminChartCard, { title: "Throughput", subtitle: "Requests / hour", className: "lg:col-span-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: REQUESTS, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "req", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "5%", stopColor: "oklch(0.68 0.17 200)", stopOpacity: 0.5 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "95%", stopColor: "oklch(0.68 0.17 200)", stopOpacity: 0 })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "oklch(0.92 0 0)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "t", stroke: "oklch(0.55 0 0)", fontSize: 11, interval: 2 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "oklch(0.55 0 0)", fontSize: 11 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
          borderRadius: 8,
          border: "1px solid oklch(0.9 0 0)",
          fontSize: 12
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "ok", stroke: "oklch(0.68 0.17 200)", fill: "url(#req)", strokeWidth: 2 })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6 shadow-[var(--shadow-card)] lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { className: "h-4 w-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Services" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: SERVICES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-3 flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
            s.ok ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-[oklch(0.55_0.16_160)] shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-[oklch(0.65_0.16_75)] shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium truncate", children: s.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                "Uptime ",
                s.uptime,
                " · ",
                s.latency
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: s.ok ? "secondary" : "destructive", children: s.status })
        ] }, s.name)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6 shadow-[var(--shadow-card)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "h-4 w-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Recent incidents" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: INCIDENTS.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium truncate", children: i.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-[10px] shrink-0", children: i.severity })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: i.when })
        ] }, i.title)) })
      ] })
    ] })
  ] }) });
}
export {
  AdminMonitoring as component
};
