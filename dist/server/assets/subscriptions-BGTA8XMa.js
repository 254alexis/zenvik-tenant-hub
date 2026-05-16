import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-_ixL3x3g.js";
import { A as AppLayout, C as CreditCard, d as Badge, D as DropdownMenu, f as DropdownMenuTrigger, g as DropdownMenuContent, h as DropdownMenuItem } from "./AppLayout--GaIKNag.js";
import { c as createLucideIcon, k as CircleCheck, C as Card, B as Button, D as DataTable, G as RefreshCw } from "./router-DMGhHKXf.js";
import { S as StatCard } from "./StatCard-DCCD8IS2.js";
import { D as DollarSign } from "./dollar-sign-CQAHdfY4.js";
import { E as Ellipsis } from "./ellipsis-gSbPlmb9.js";
import { A as ArrowUpRight } from "./arrow-up-right-CtD_yUzr.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./api-ySu1tSp5.js";
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode);
const PLANS = [{
  id: "starter",
  name: "Starter",
  price: 29,
  cadence: "mo",
  active: 48,
  features: ["Up to 10 units", "Email support", "1 admin seat"]
}, {
  id: "growth",
  name: "Growth",
  price: 99,
  cadence: "mo",
  active: 41,
  highlight: true,
  features: ["Up to 100 units", "Priority support", "5 admin seats", "Custom branding"]
}, {
  id: "scale",
  name: "Scale",
  price: 299,
  cadence: "mo",
  active: 22,
  features: ["Unlimited units", "Dedicated CSM", "20 admin seats", "API access"]
}, {
  id: "enterprise",
  name: "Enterprise",
  price: 999,
  cadence: "mo",
  active: 7,
  features: ["SLA 99.99%", "SSO / SCIM", "Custom contracts", "Onboarding"]
}];
const SUBS = [{
  id: "S-5001",
  workspace: "Riverside Holdings",
  plan: "Scale",
  seats: 12,
  mrr: 299,
  status: "Active",
  renews: "2026-06-02"
}, {
  id: "S-5002",
  workspace: "Northgate Estates",
  plan: "Growth",
  seats: 5,
  mrr: 99,
  status: "Active",
  renews: "2026-05-30"
}, {
  id: "S-5003",
  workspace: "Hillside Realty",
  plan: "Starter",
  seats: 1,
  mrr: 0,
  status: "Trial",
  renews: "2026-05-28"
}, {
  id: "S-5004",
  workspace: "Eastview Group",
  plan: "Growth",
  seats: 6,
  mrr: 99,
  status: "Active",
  renews: "2026-06-11"
}, {
  id: "S-5005",
  workspace: "Summit Residential",
  plan: "Enterprise",
  seats: 24,
  mrr: 999,
  status: "Active",
  renews: "2026-08-19"
}, {
  id: "S-5006",
  workspace: "Meadowlane Group",
  plan: "Starter",
  seats: 1,
  mrr: 29,
  status: "Past due",
  renews: "2026-05-01"
}, {
  id: "S-5007",
  workspace: "Laketown Realty",
  plan: "Growth",
  seats: 3,
  mrr: 99,
  status: "Active",
  renews: "2026-06-04"
}];
const statusVariant = (s) => s === "Active" ? "secondary" : s === "Trial" ? "outline" : "destructive";
function AdminSubscriptions() {
  const [subs, setSubs] = reactExports.useState(SUBS);
  const totalMrr = subs.filter((s) => s.status === "Active").reduce((a, s) => a + s.mrr, 0);
  const pastDue = subs.filter((s) => s.status === "Past due").length;
  const trials = subs.filter((s) => s.status === "Trial").length;
  const cancel = (id) => setSubs((s) => s.map((x) => x.id === id ? {
    ...x,
    status: "Canceled"
  } : x));
  const columns = [{
    key: "workspace",
    label: "Workspace",
    render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: r.workspace }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: r.id })
    ] })
  }, {
    key: "plan",
    label: "Plan",
    render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: r.plan })
  }, {
    key: "seats",
    label: "Seats",
    className: "text-right"
  }, {
    key: "mrr",
    label: "MRR",
    render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums", children: [
      "$",
      r.mrr
    ] }),
    className: "text-right"
  }, {
    key: "status",
    label: "Status",
    render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: statusVariant(r.status), children: r.status })
  }, {
    key: "renews",
    label: "Renews",
    hideOnMobile: true
  }, {
    key: "actions",
    label: "",
    render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4" }),
          " Change plan"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4" }),
          " Retry charge"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: "text-destructive focus:text-destructive", onClick: () => cancel(r.id), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4" }),
          " Cancel subscription"
        ] })
      ] })
    ] }),
    className: "w-12"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { allow: ["super_admin"], children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 max-w-7xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-semibold tracking-tight", children: "Subscriptions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Manage plans, billing, and active subscriptions." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "MRR", value: `$${totalMrr.toLocaleString()}`, icon: DollarSign, tone: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Active subs", value: String(subs.filter((s) => s.status === "Active").length), icon: CreditCard }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Trials", value: String(trials), icon: CircleCheck }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Past due", value: String(pastDue), icon: CircleX, tone: "warning" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold mb-4", children: "Plans" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: PLANS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: `p-6 shadow-[var(--shadow-card)] ${p.highlight ? "border-primary ring-1 ring-primary/30" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: p.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-baseline gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-3xl font-semibold tracking-tight", children: [
                "$",
                p.price
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                "/",
                p.cadence
              ] })
            ] })
          ] }),
          p.highlight && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { children: "Popular" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-2 text-sm", children: p.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 mt-0.5 text-[oklch(0.55_0.16_160)] shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: f })
        ] }, f)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 pt-4 border-t border-border text-xs text-muted-foreground", children: [
          p.active,
          " active workspaces"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", className: "w-full mt-3", children: "Edit plan" })
      ] }, p.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-4 sm:p-6 shadow-[var(--shadow-card)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DataTable, { rows: subs, columns, searchKeys: ["workspace", "plan", "id"], searchPlaceholder: "Search subscriptions…", filters: [{
      key: "status",
      label: "Status",
      options: [{
        value: "Active",
        label: "Active"
      }, {
        value: "Trial",
        label: "Trial"
      }, {
        value: "Past due",
        label: "Past due"
      }, {
        value: "Canceled",
        label: "Canceled"
      }]
    }, {
      key: "plan",
      label: "Plan",
      options: [{
        value: "Starter",
        label: "Starter"
      }, {
        value: "Growth",
        label: "Growth"
      }, {
        value: "Scale",
        label: "Scale"
      }, {
        value: "Enterprise",
        label: "Enterprise"
      }]
    }] }) })
  ] }) });
}
export {
  AdminSubscriptions as component
};
