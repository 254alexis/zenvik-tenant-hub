import { U as jsxRuntimeExports } from "./worker-entry-_ixL3x3g.js";
import { A as AppLayout, d as Badge } from "./AppLayout--GaIKNag.js";
import { S as StatCard } from "./StatCard-DCCD8IS2.js";
import { W as Wrench, o as Clock, k as CircleCheck, C as Card, T as TriangleAlert, B as Button } from "./router-DMGhHKXf.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./api-ySu1tSp5.js";
const tasks = [{
  id: "T-204",
  title: "Leaking kitchen faucet",
  unit: "Apt 4B · Riverside",
  priority: "High",
  status: "In progress"
}, {
  id: "T-203",
  title: "Broken thermostat",
  unit: "Apt 12 · Northgate",
  priority: "Medium",
  status: "Open"
}, {
  id: "T-201",
  title: "Repaint hallway",
  unit: "Common · Eastview",
  priority: "Low",
  status: "Open"
}, {
  id: "T-198",
  title: "Replace smoke detector",
  unit: "Apt 7A · Eastview",
  priority: "High",
  status: "Open"
}];
const priorityClass = (p) => p === "High" ? "bg-[oklch(0.93_0.09_25)] text-[oklch(0.4_0.18_25)]" : p === "Medium" ? "bg-[oklch(0.95_0.08_75)] text-[oklch(0.4_0.13_75)]" : "bg-secondary text-muted-foreground";
function StaffDashboard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { allow: ["staff"], children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-semibold tracking-tight", children: "Maintenance tasks" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Your assigned work orders." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Open", value: "6", icon: Wrench }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "In progress", value: "2", icon: Clock, tone: "warning" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Closed this week", value: "9", icon: CircleCheck, tone: "success" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6 shadow-[var(--shadow-card)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Assigned to you" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Sorted by priority" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: tasks.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-lg border border-border flex items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: t.id }),
            t.priority === "High" && /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3 w-3 text-[oklch(0.55_0.2_25)]" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium mt-0.5", children: t.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: t.unit }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: priorityClass(t.priority), children: t.priority }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: t.status })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", children: "Update" })
      ] }, t.id)) })
    ] })
  ] }) });
}
export {
  StaffDashboard as component
};
