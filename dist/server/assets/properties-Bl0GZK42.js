import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-_ixL3x3g.js";
import { H as House, A as AppLayout } from "./AppLayout--GaIKNag.js";
import { c as createLucideIcon, u as useStore, B as Button, P as Plus, C as Card, D as DataTable, F as FormModal, L as Label, I as Input, S as StatusBadge, t as toast } from "./router-DMGhHKXf.js";
import { u as useApiList, E as ENDPOINTS, a as apiPost } from "./apiClient-BKY6RsTL.js";
import { B as Building2 } from "./api-ySu1tSp5.js";
import { T as TrendingUp } from "./trending-up-gve5kwFL.js";
import { M as MapPin } from "./map-pin-C9h0LeQN.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$1 = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
];
const Layers = createLucideIcon("layers", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode);
const empty = {
  name: "",
  address: "",
  units: 1,
  type: "Residential"
};
function PropertiesPage() {
  const {
    data: store,
    addProperty
  } = useStore();
  const remote = useApiList(ENDPOINTS.properties);
  const remoteUnits = useApiList(ENDPOINTS.units);
  const [open, setOpen] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(empty);
  const [saving, setSaving] = reactExports.useState(false);
  const properties = reactExports.useMemo(() => {
    const remoteProps = (remote.data ?? []).map((p, i) => ({
      id: String(p.id ?? p.property_id ?? `r${i}`),
      name: p.name ?? p.property_name ?? "Untitled",
      address: p.address ?? p.location ?? "—",
      type: p.type ?? p.category ?? "Residential",
      units: Number(p.units ?? p.unit_count ?? 0)
    }));
    const base = remoteProps.length > 0 ? remoteProps : store.properties;
    const remoteUnitList = remoteUnits.data ?? [];
    return base.map((p) => {
      const localUnits = store.units.filter((u) => u.property_id === p.id);
      const remoteUnitsForProp = remoteUnitList.filter((u) => String(u.property_id ?? u.propertyId) === String(p.id));
      const units = remoteUnitsForProp.length ? remoteUnitsForProp : localUnits;
      const occupied = units.filter((u) => (u.status ?? "").toLowerCase() === "occupied").length;
      const total = units.length || p.units || 0;
      const vacant = Math.max(0, total - occupied);
      const occupancy = total ? Math.round(occupied / total * 100) : 0;
      const status = occupancy === 100 ? "occupied" : occupancy === 0 ? "vacant" : "occupied";
      return {
        id: p.id,
        name: p.name,
        address: p.address,
        type: p.type,
        total_units: total,
        occupied,
        vacant,
        occupancy,
        status
      };
    });
  }, [remote.data, remoteUnits.data, store.properties, store.units]);
  const totals = reactExports.useMemo(() => {
    const total_units = properties.reduce((a, p) => a + p.total_units, 0);
    const occupied = properties.reduce((a, p) => a + p.occupied, 0);
    return {
      properties: properties.length,
      total_units,
      occupied,
      occupancy: total_units ? Math.round(occupied / total_units * 100) : 0
    };
  }, [properties]);
  const openCreate = () => {
    setEditing(null);
    setForm(empty);
    setOpen(true);
  };
  const openEdit = (row) => {
    setEditing(row);
    setForm({
      name: row.name,
      address: row.address,
      units: row.total_units,
      type: row.type
    });
    setOpen(true);
  };
  const submit = async () => {
    if (!form.name.trim() || !form.address.trim()) {
      toast.error("Name and address are required");
      return;
    }
    setSaving(true);
    try {
      const endpoint = editing ? ENDPOINTS.updateProperty : ENDPOINTS.addProperty;
      const payload = {
        ...form,
        units: Number(form.units) || 0
      };
      if (editing) payload.property_id = editing.id;
      try {
        await apiPost(endpoint, payload);
        toast.success(editing ? "Property updated" : "Property created");
        remote.reload();
      } catch (e) {
        if (!editing) addProperty({
          ...form,
          units: Number(form.units) || 0
        });
        toast.success(editing ? "Saved locally" : "Added locally");
      }
      setOpen(false);
    } finally {
      setSaving(false);
    }
  };
  const columns = [{
    key: "name",
    label: "Property",
    render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-lg bg-secondary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-4 w-4 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium truncate", children: r.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground flex items-center gap-1 truncate", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
          " ",
          r.address
        ] })
      ] })
    ] })
  }, {
    key: "type",
    label: "Type",
    className: "text-muted-foreground"
  }, {
    key: "total_units",
    label: "Units",
    render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums font-medium", children: r.total_units })
  }, {
    key: "occupancy",
    label: "Occupancy",
    render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-[120px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
          r.occupancy,
          "%"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground tabular-nums", children: [
          r.occupied,
          "/",
          r.total_units
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-secondary overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-primary transition-all", style: {
        width: `${r.occupancy}%`
      } }) })
    ] })
  }, {
    key: "vacant",
    label: "Vacant",
    render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: r.vacant > 0 ? "vacant" : "occupied" })
  }, {
    key: "actions",
    label: "",
    className: "text-right w-12",
    render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: (e) => {
      e.stopPropagation();
      openEdit(r);
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }) })
  }];
  const stats = [{
    label: "Total properties",
    value: totals.properties,
    icon: Building2
  }, {
    label: "Total units",
    value: totals.total_units,
    icon: Layers
  }, {
    label: "Occupied",
    value: totals.occupied,
    icon: House
  }, {
    label: "Occupancy rate",
    value: `${totals.occupancy}%`,
    icon: TrendingUp
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { allow: ["landlord", "super_admin"], children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-7xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-semibold tracking-tight", children: "Properties" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Manage all buildings, units, and occupancy across your portfolio." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: openCreate, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
        " Add property"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: stats.map((s) => {
      const Icon = s.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-4 shadow-[var(--shadow-card)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-lg bg-secondary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: s.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-semibold tabular-nums", children: s.value })
        ] })
      ] }) }, s.label);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DataTable, { rows: properties, columns, loading: remote.loading, error: remote.error, onRetry: remote.reload, searchKeys: ["name", "address", "type"], searchPlaceholder: "Search properties or address…", filters: [{
      key: "type",
      label: "Types",
      options: Array.from(new Set(properties.map((p) => p.type))).map((t) => ({
        value: t,
        label: t
      }))
    }], empty: "No properties yet." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(FormModal, { open, onOpenChange: setOpen, title: editing ? "Edit property" : "Add property", description: editing ? "Update building details." : "Create a new building in your portfolio.", submitLabel: saving ? "Saving…" : editing ? "Save changes" : "Create", onSubmit: submit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.name, onChange: (e) => setForm({
          ...form,
          name: e.target.value
        }), maxLength: 100, required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Address" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.address, onChange: (e) => setForm({
          ...form,
          address: e.target.value
        }), maxLength: 200, required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Units" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 1, value: form.units, onChange: (e) => setForm({
            ...form,
            units: Number(e.target.value)
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "w-full h-10 rounded-md border border-input bg-background px-3 text-sm", value: form.type, onChange: (e) => setForm({
            ...form,
            type: e.target.value
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Residential" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Commercial" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Mixed-use" })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  PropertiesPage as component
};
