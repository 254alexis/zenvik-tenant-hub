import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-_ixL3x3g.js";
import { A as AppLayout, S as ShieldCheck, U as Users, d as Badge, D as DropdownMenu, f as DropdownMenuTrigger, g as DropdownMenuContent, h as DropdownMenuItem, i as DropdownMenuSeparator } from "./AppLayout--GaIKNag.js";
import { c as createLucideIcon, B as Button, C as Card, D as DataTable, E as Eye } from "./router-DMGhHKXf.js";
import { S as StatCard } from "./StatCard-DCCD8IS2.js";
import { B as Building2 } from "./api-ySu1tSp5.js";
import { E as Ellipsis } from "./ellipsis-gSbPlmb9.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M4.929 4.929 19.07 19.071", key: "196cmz" }]
];
const Ban = createLucideIcon("ban", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",
      key: "1s6t7t"
    }
  ],
  ["circle", { cx: "16.5", cy: "7.5", r: ".5", fill: "currentColor", key: "w0ekpg" }]
];
const KeyRound = createLucideIcon("key-round", __iconNode$1);
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserPlus = createLucideIcon("user-plus", __iconNode);
const ROWS = [{
  id: "L-1042",
  name: "Aisha Mwangi",
  email: "aisha@riverside.co",
  workspace: "Riverside Holdings",
  plan: "Scale",
  properties: 18,
  tenants: 84,
  status: "Active",
  joined: "2024-11-02"
}, {
  id: "L-1043",
  name: "David Otieno",
  email: "david@northgate.io",
  workspace: "Northgate Estates",
  plan: "Growth",
  properties: 11,
  tenants: 52,
  status: "Active",
  joined: "2025-01-14"
}, {
  id: "L-1044",
  name: "Priya Shah",
  email: "priya@hillside.com",
  workspace: "Hillside Realty",
  plan: "Starter",
  properties: 6,
  tenants: 21,
  status: "Trial",
  joined: "2026-04-21"
}, {
  id: "L-1045",
  name: "James Kariuki",
  email: "james@eastview.co",
  workspace: "Eastview Group",
  plan: "Growth",
  properties: 14,
  tenants: 68,
  status: "Active",
  joined: "2025-03-11"
}, {
  id: "L-1046",
  name: "Lina Park",
  email: "lina@summit.co",
  workspace: "Summit Residential",
  plan: "Enterprise",
  properties: 42,
  tenants: 211,
  status: "Active",
  joined: "2024-08-19"
}, {
  id: "L-1047",
  name: "Tom Becker",
  email: "tom@meadowlane.io",
  workspace: "Meadowlane Group",
  plan: "Starter",
  properties: 4,
  tenants: 14,
  status: "Suspended",
  joined: "2025-09-04"
}, {
  id: "L-1048",
  name: "Sara Ali",
  email: "sara@laketown.co",
  workspace: "Laketown Realty",
  plan: "Growth",
  properties: 9,
  tenants: 41,
  status: "Active",
  joined: "2025-12-02"
}];
const statusVariant = (s) => s === "Active" ? "secondary" : s === "Trial" ? "outline" : "destructive";
function AdminLandlords() {
  const [rows, setRows] = reactExports.useState(ROWS);
  const toggleSuspend = (id) => setRows((rs) => rs.map((r) => r.id === id ? {
    ...r,
    status: r.status === "Suspended" ? "Active" : "Suspended"
  } : r));
  const columns = [{
    key: "name",
    label: "Landlord",
    render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: r.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: r.email })
    ] })
  }, {
    key: "workspace",
    label: "Workspace"
  }, {
    key: "plan",
    label: "Plan",
    render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: r.plan })
  }, {
    key: "properties",
    label: "Properties",
    className: "text-right"
  }, {
    key: "tenants",
    label: "Tenants",
    className: "text-right"
  }, {
    key: "status",
    label: "Status",
    render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: statusVariant(r.status), children: r.status })
  }, {
    key: "joined",
    label: "Joined",
    hideOnMobile: true
  }, {
    key: "actions",
    label: "",
    render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }),
          " View workspace"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "h-4 w-4" }),
          " Reset password"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: "text-destructive focus:text-destructive", onClick: () => toggleSuspend(r.id), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "h-4 w-4" }),
          r.status === "Suspended" ? "Reactivate" : "Suspend"
        ] })
      ] })
    ] }),
    className: "w-12"
  }];
  const active = rows.filter((r) => r.status === "Active").length;
  const trial = rows.filter((r) => r.status === "Trial").length;
  const suspended = rows.filter((r) => r.status === "Suspended").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { allow: ["super_admin"], children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 max-w-7xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between flex-wrap gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-semibold tracking-tight", children: "Landlord accounts" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Manage workspaces, plans, and access for landlords." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-4 w-4" }),
        " Invite landlord"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total landlords", value: String(rows.length), icon: ShieldCheck }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Active", value: String(active), icon: Users, tone: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "On trial", value: String(trial), icon: Building2 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Suspended", value: String(suspended), icon: Ban, tone: "warning" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-4 sm:p-6 shadow-[var(--shadow-card)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DataTable, { rows, columns, searchKeys: ["name", "email", "workspace", "id"], searchPlaceholder: "Search landlords, workspaces…", filters: [{
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
    }, {
      key: "status",
      label: "Status",
      options: [{
        value: "Active",
        label: "Active"
      }, {
        value: "Trial",
        label: "Trial"
      }, {
        value: "Suspended",
        label: "Suspended"
      }]
    }] }) })
  ] }) });
}
export {
  AdminLandlords as component
};
