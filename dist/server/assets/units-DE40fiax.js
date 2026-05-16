import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-_ixL3x3g.js";
import { H as House, A as AppLayout } from "./AppLayout--GaIKNag.js";
import { c as createLucideIcon, u as useStore, W as Wrench, B as Button, P as Plus, C as Card, D as DataTable, F as FormModal, L as Label, I as Input, S as StatusBadge, t as toast } from "./router-DMGhHKXf.js";
import { u as useApiList, E as ENDPOINTS } from "./apiClient-BKY6RsTL.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./api-ySu1tSp5.js";
const __iconNode$1 = [
  ["path", { d: "M2 4v16", key: "vw9hq8" }],
  ["path", { d: "M2 8h18a2 2 0 0 1 2 2v10", key: "1dgv2r" }],
  ["path", { d: "M2 17h20", key: "18nfp3" }],
  ["path", { d: "M6 8v9", key: "1yriud" }]
];
const Bed = createLucideIcon("bed", __iconNode$1);
const __iconNode = [
  ["path", { d: "M11 20H2", key: "nlcfvz" }],
  [
    "path",
    {
      d: "M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z",
      key: "au4z13"
    }
  ],
  ["path", { d: "M11 4H8a2 2 0 0 0-2 2v14", key: "74r1mk" }],
  ["path", { d: "M14 12h.01", key: "1jfl7z" }],
  ["path", { d: "M22 20h-3", key: "vhrsz" }]
];
const DoorOpen = createLucideIcon("door-open", __iconNode);
function UnitsPage() {
  const {
    data: store,
    addUnit
  } = useStore();
  const remoteUnits = useApiList(ENDPOINTS.units);
  const remoteProps = useApiList(ENDPOINTS.properties);
  const [open, setOpen] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    property_id: store.properties[0]?.id || "",
    label: "",
    bedrooms: 1,
    rent: 1500,
    status: "vacant"
  });
  const properties = reactExports.useMemo(() => {
    const r = (remoteProps.data ?? []).map((p) => ({
      id: String(p.id ?? p.property_id),
      name: p.name ?? p.property_name ?? "Untitled"
    }));
    return r.length ? r : store.properties.map((p) => ({
      id: p.id,
      name: p.name
    }));
  }, [remoteProps.data, store.properties]);
  const units = reactExports.useMemo(() => {
    const remoteList = (remoteUnits.data ?? []).map((u, i) => ({
      id: String(u.id ?? u.unit_id ?? `u${i}`),
      property_id: String(u.property_id ?? u.propertyId ?? ""),
      label: u.label ?? u.unit_label ?? u.name ?? "Unit",
      bedrooms: Number(u.bedrooms ?? u.beds ?? 0),
      rent: Number(u.rent ?? u.amount ?? 0),
      status: (u.status ?? "vacant").toLowerCase() || "vacant"
    }));
    const base = remoteList.length ? remoteList : store.units;
    return base.map((u) => ({
      ...u,
      property_name: properties.find((p) => p.id === u.property_id)?.name ?? "—"
    }));
  }, [remoteUnits.data, store.units, properties]);
  const stats = reactExports.useMemo(() => {
    const occupied = units.filter((u) => u.status === "occupied").length;
    const vacant = units.filter((u) => u.status === "vacant").length;
    const maintenance = units.filter((u) => u.status === "maintenance").length;
    return [{
      label: "Total units",
      value: units.length,
      icon: House
    }, {
      label: "Occupied",
      value: occupied,
      icon: House
    }, {
      label: "Vacant",
      value: vacant,
      icon: DoorOpen
    }, {
      label: "Maintenance",
      value: maintenance,
      icon: Wrench
    }];
  }, [units]);
  const submit = () => {
    if (!form.label.trim() || !form.property_id) {
      toast.error("Label and property are required");
      return;
    }
    addUnit({
      ...form,
      bedrooms: Number(form.bedrooms),
      rent: Number(form.rent)
    });
    toast.success("Unit added");
    setForm({
      ...form,
      label: ""
    });
  };
  const columns = [{
    key: "label",
    label: "Unit",
    render: (u) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: u.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: u.property_name })
    ] })
  }, {
    key: "bedrooms",
    label: "Bedrooms",
    render: (u) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Bed, { className: "h-3.5 w-3.5" }),
      " ",
      u.bedrooms
    ] })
  }, {
    key: "rent",
    label: "Rent",
    render: (u) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium tabular-nums", children: [
      "$",
      u.rent.toLocaleString(),
      "/mo"
    ] })
  }, {
    key: "status",
    label: "Status",
    render: (u) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: u.status })
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { allow: ["landlord", "super_admin"], children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-7xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-semibold tracking-tight", children: "Units" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-1", children: [
          units.length,
          " units across ",
          properties.length,
          " properties"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setOpen(true), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
        " Add unit"
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
    /* @__PURE__ */ jsxRuntimeExports.jsx(DataTable, { rows: units, columns, loading: remoteUnits.loading, error: remoteUnits.error, onRetry: remoteUnits.reload, searchKeys: ["label", "property_name"], searchPlaceholder: "Search units…", filters: [{
      key: "status",
      label: "Statuses",
      options: [{
        value: "occupied",
        label: "Occupied"
      }, {
        value: "vacant",
        label: "Vacant"
      }, {
        value: "maintenance",
        label: "Maintenance"
      }]
    }, {
      key: "property_id",
      label: "Properties",
      options: properties.map((p) => ({
        value: p.id,
        label: p.name
      }))
    }], empty: "No units yet." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(FormModal, { open, onOpenChange: setOpen, title: "Add unit", submitLabel: "Create", onSubmit: submit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Property" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: "w-full h-10 rounded-md border border-input bg-background px-3 text-sm", value: form.property_id, onChange: (e) => setForm({
          ...form,
          property_id: e.target.value
        }), children: properties.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p.id, children: p.name }, p.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Label" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.label, onChange: (e) => setForm({
          ...form,
          label: e.target.value
        }), placeholder: "Apt 5B", required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Bedrooms" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 0, value: form.bedrooms, onChange: (e) => setForm({
            ...form,
            bedrooms: Number(e.target.value)
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Rent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 0, value: form.rent, onChange: (e) => setForm({
            ...form,
            rent: Number(e.target.value)
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "w-full h-10 rounded-md border border-input bg-background px-3 text-sm capitalize", value: form.status, onChange: (e) => setForm({
            ...form,
            status: e.target.value
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "vacant", children: "Vacant" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "occupied", children: "Occupied" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "maintenance", children: "Maintenance" })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  UnitsPage as component
};
