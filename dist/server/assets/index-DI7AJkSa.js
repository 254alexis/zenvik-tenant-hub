import { U as jsxRuntimeExports } from "./worker-entry-_ixL3x3g.js";
import { A as AppLayout, C as CreditCard, H as House, d as Badge, R as Receipt } from "./AppLayout--GaIKNag.js";
import { S as StatCard } from "./StatCard-DCCD8IS2.js";
import { r as FileText, C as Card, B as Button, n as Download } from "./router-DMGhHKXf.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./api-ySu1tSp5.js";
const invoices = [{
  id: "INV-2041",
  period: "Nov 2025",
  amount: "$2,100",
  due: "Nov 1",
  status: "Due"
}, {
  id: "INV-2018",
  period: "Oct 2025",
  amount: "$2,100",
  due: "Oct 1",
  status: "Paid"
}, {
  id: "INV-1995",
  period: "Sep 2025",
  amount: "$2,100",
  due: "Sep 1",
  status: "Paid"
}];
function TenantDashboard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { allow: ["tenant"], children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-semibold tracking-tight", children: "Welcome home" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Apt 7A · Eastview Apartments" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Next invoice", value: "$2,100", delta: "Due Nov 1", icon: FileText, tone: "warning" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Paid this year", value: "$21,000", delta: "10 invoices", icon: CreditCard, tone: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Lease ends", value: "Jun 2026", delta: "7 months left", icon: House })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6 shadow-[var(--shadow-card)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Invoices & receipts" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Your billing history" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", children: "Pay now" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: invoices.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: i.id }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            i.period,
            " · Due ",
            i.due
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: i.amount }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: i.status === "Paid" ? "bg-[oklch(0.94_0.07_160)] text-[oklch(0.35_0.12_160)]" : "bg-[oklch(0.95_0.08_75)] text-[oklch(0.4_0.13_75)]", children: i.status }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", "aria-label": "Download receipt", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", "aria-label": "Download invoice", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }) })
        ] })
      ] }, i.id)) })
    ] })
  ] }) });
}
export {
  TenantDashboard as component
};
