import { U as jsxRuntimeExports } from "./worker-entry-_ixL3x3g.js";
import { A as AppLayout, U as Users, H as House, d as Badge } from "./AppLayout--GaIKNag.js";
import { c as createLucideIcon, C as Card, D as DataTable } from "./router-DMGhHKXf.js";
import { S as StatCard } from "./StatCard-DCCD8IS2.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./api-ySu1tSp5.js";
const __iconNode$1 = [
  ["path", { d: "m16 11 2 2 4-4", key: "9rsbq5" }],
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const UserCheck = createLucideIcon("user-check", __iconNode$1);
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "17", x2: "22", y1: "8", y2: "13", key: "3nzzx3" }],
  ["line", { x1: "22", x2: "17", y1: "8", y2: "13", key: "1swrse" }]
];
const UserX = createLucideIcon("user-x", __iconNode);
const ROWS = [{
  id: "T-9001",
  name: "Mark Wanyama",
  email: "mark.w@mail.com",
  workspace: "Riverside Holdings",
  property: "Riverside Towers",
  unit: "A-204",
  status: "Active"
}, {
  id: "T-9002",
  name: "Grace Atieno",
  email: "grace.a@mail.com",
  workspace: "Northgate Estates",
  property: "Northgate Plaza",
  unit: "B-110",
  status: "Active"
}, {
  id: "T-9003",
  name: "Eric Mutua",
  email: "eric.m@mail.com",
  workspace: "Hillside Realty",
  property: "Hillside Court",
  unit: "C-3",
  status: "Pending"
}, {
  id: "T-9004",
  name: "Naomi Wairimu",
  email: "naomi.w@mail.com",
  workspace: "Eastview Group",
  property: "Eastview Heights",
  unit: "D-501",
  status: "Active"
}, {
  id: "T-9005",
  name: "Brian Ouma",
  email: "brian.o@mail.com",
  workspace: "Summit Residential",
  property: "Summit Business Park",
  unit: "E-12",
  status: "Moved out"
}, {
  id: "T-9006",
  name: "Lucy Njeri",
  email: "lucy.n@mail.com",
  workspace: "Laketown Realty",
  property: "Laketown Villas",
  unit: "F-7",
  status: "Active"
}];
const statusVariant = (s) => s === "Active" ? "secondary" : s === "Pending" ? "outline" : "destructive";
function AdminUsers() {
  const active = ROWS.filter((r) => r.status === "Active").length;
  const pending = ROWS.filter((r) => r.status === "Pending").length;
  const moved = ROWS.filter((r) => r.status === "Moved out").length;
  const columns = [{
    key: "name",
    label: "Tenant",
    render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: r.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: r.email })
    ] })
  }, {
    key: "workspace",
    label: "Workspace"
  }, {
    key: "property",
    label: "Property",
    render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: r.property }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
        "Unit ",
        r.unit
      ] })
    ] })
  }, {
    key: "status",
    label: "Status",
    render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: statusVariant(r.status), children: r.status })
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { allow: ["super_admin"], children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 max-w-7xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-semibold tracking-tight", children: "Tenants" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "All tenants across every workspace on the platform." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total tenants", value: String(ROWS.length), icon: Users }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Active", value: String(active), icon: UserCheck, tone: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Pending", value: String(pending), icon: House }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Moved out", value: String(moved), icon: UserX, tone: "warning" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-4 sm:p-6 shadow-[var(--shadow-card)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DataTable, { rows: ROWS, columns, searchKeys: ["name", "email", "workspace", "property", "unit"], searchPlaceholder: "Search tenants…", filters: [{
      key: "status",
      label: "Status",
      options: [{
        value: "Active",
        label: "Active"
      }, {
        value: "Pending",
        label: "Pending"
      }, {
        value: "Moved out",
        label: "Moved out"
      }]
    }] }) })
  ] }) });
}
export {
  AdminUsers as component
};
