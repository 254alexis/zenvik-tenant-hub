import { U as jsxRuntimeExports } from "./worker-entry-_ixL3x3g.js";
import { A as AppLayout, H as House, d as Badge } from "./AppLayout--GaIKNag.js";
import { C as Card, D as DataTable } from "./router-DMGhHKXf.js";
import { S as StatCard } from "./StatCard-DCCD8IS2.js";
import { B as Building2 } from "./api-ySu1tSp5.js";
import { M as MapPin } from "./map-pin-C9h0LeQN.js";
import { T as TrendingUp } from "./trending-up-gve5kwFL.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const ROWS = [{
  id: "P-2001",
  name: "Riverside Towers",
  workspace: "Riverside Holdings",
  city: "Nairobi",
  units: 42,
  occupancy: 96,
  type: "Residential"
}, {
  id: "P-2002",
  name: "Northgate Plaza",
  workspace: "Northgate Estates",
  city: "Mombasa",
  units: 28,
  occupancy: 89,
  type: "Mixed"
}, {
  id: "P-2003",
  name: "Hillside Court",
  workspace: "Hillside Realty",
  city: "Kisumu",
  units: 16,
  occupancy: 81,
  type: "Residential"
}, {
  id: "P-2004",
  name: "Eastview Heights",
  workspace: "Eastview Group",
  city: "Nairobi",
  units: 60,
  occupancy: 92,
  type: "Residential"
}, {
  id: "P-2005",
  name: "Summit Business Park",
  workspace: "Summit Residential",
  city: "Nairobi",
  units: 24,
  occupancy: 100,
  type: "Commercial"
}, {
  id: "P-2006",
  name: "Laketown Villas",
  workspace: "Laketown Realty",
  city: "Naivasha",
  units: 18,
  occupancy: 78,
  type: "Residential"
}];
function AdminProperties() {
  const totalUnits = ROWS.reduce((a, r) => a + r.units, 0);
  const avgOcc = Math.round(ROWS.reduce((a, r) => a + r.occupancy, 0) / ROWS.length);
  const columns = [{
    key: "name",
    label: "Property",
    render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: r.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: r.workspace })
    ] })
  }, {
    key: "city",
    label: "City"
  }, {
    key: "type",
    label: "Type",
    render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: r.type })
  }, {
    key: "units",
    label: "Units",
    className: "text-right"
  }, {
    key: "occupancy",
    label: "Occupancy",
    render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-[120px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 rounded-full bg-secondary overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-primary", style: {
        width: `${r.occupancy}%`
      } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs tabular-nums w-9 text-right", children: [
        r.occupancy,
        "%"
      ] })
    ] })
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { allow: ["super_admin"], children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 max-w-7xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-semibold tracking-tight", children: "Properties" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "All properties across every workspace." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total properties", value: String(ROWS.length), icon: Building2 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total units", value: String(totalUnits), icon: House }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Cities", value: String(new Set(ROWS.map((r) => r.city)).size), icon: MapPin }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Avg occupancy", value: `${avgOcc}%`, icon: TrendingUp, tone: "success" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-4 sm:p-6 shadow-[var(--shadow-card)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DataTable, { rows: ROWS, columns, searchKeys: ["name", "workspace", "city", "id"], searchPlaceholder: "Search properties…", filters: [{
      key: "type",
      label: "Type",
      options: [{
        value: "Residential",
        label: "Residential"
      }, {
        value: "Commercial",
        label: "Commercial"
      }, {
        value: "Mixed",
        label: "Mixed"
      }]
    }] }) })
  ] }) });
}
export {
  AdminProperties as component
};
