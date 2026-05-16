import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-_ixL3x3g.js";
import { A as AppLayout } from "./AppLayout--GaIKNag.js";
import { u as useStore, B as Button, P as Plus, o as Clock, W as Wrench, k as CircleCheck, T as TriangleAlert, D as DataTable, F as FormModal, L as Label, I as Input, p as Textarea, b as Sheet, d as SheetContent, e as SheetHeader, f as SheetTitle, g as SheetDescription, C as Card, U as UserCog, t as toast } from "./router-DMGhHKXf.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./api-ySu1tSp5.js";
const PRIORITY_TONE = {
  low: "bg-secondary text-muted-foreground",
  medium: "bg-[oklch(0.93_0.07_220)] text-[oklch(0.38_0.15_220)]",
  high: "bg-[oklch(0.95_0.08_75)] text-[oklch(0.4_0.13_75)]",
  urgent: "bg-[oklch(0.93_0.09_25)] text-[oklch(0.4_0.18_25)]"
};
const STATUS_TONE = {
  open: "bg-[oklch(0.93_0.09_25)] text-[oklch(0.4_0.18_25)]",
  assigned: "bg-[oklch(0.93_0.07_220)] text-[oklch(0.38_0.15_220)]",
  in_progress: "bg-[oklch(0.95_0.08_75)] text-[oklch(0.4_0.13_75)]",
  resolved: "bg-[oklch(0.94_0.07_160)] text-[oklch(0.35_0.12_160)]",
  closed: "bg-secondary text-muted-foreground"
};
const STAFF = ["James Carter", "Priya Patel", "Marco Silva", "Anita Rao"];
const CATEGORIES = ["Plumbing", "Electrical", "HVAC", "General", "Appliance", "Pest control"];
function PriorityBadge({
  p
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium capitalize ${PRIORITY_TONE[p]}`, children: [
    p === "urgent" && /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3 w-3 mr-1" }),
    p
  ] });
}
function StatusBadge({
  s
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium capitalize ${STATUS_TONE[s]}`, children: s.replace("_", " ") });
}
function MaintenancePage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { allow: ["super_admin", "landlord", "staff"], children: /* @__PURE__ */ jsxRuntimeExports.jsx(MaintenanceView, {}) });
}
function MaintenanceView({
  tenantOnly
} = {}) {
  const {
    data,
    addMaintenance,
    updateMaintenance
  } = useStore();
  const [open, setOpen] = reactExports.useState(false);
  const [active, setActive] = reactExports.useState(null);
  const rows = reactExports.useMemo(() => tenantOnly ? data.maintenance.filter((m) => m.tenant_id === tenantOnly) : data.maintenance, [data.maintenance, tenantOnly]);
  const stats = reactExports.useMemo(() => {
    const s = {
      open: 0,
      in_progress: 0,
      resolved: 0,
      urgent: 0
    };
    rows.forEach((r) => {
      if (r.status === "open" || r.status === "assigned") s.open++;
      if (r.status === "in_progress") s.in_progress++;
      if (r.status === "resolved" || r.status === "closed") s.resolved++;
      if (r.priority === "urgent" && r.status !== "resolved" && r.status !== "closed") s.urgent++;
    });
    return s;
  }, [rows]);
  const propertyName = (id) => data.properties.find((p) => p.id === id)?.name ?? "—";
  const unitLabel = (id) => data.units.find((u) => u.id === id)?.label ?? "—";
  const tenantName = (id) => data.tenants.find((t) => t.id === id)?.name ?? "—";
  const handleSubmit = (e) => {
    const fd = new FormData(e.currentTarget);
    const property_id = fd.get("property_id") || data.properties[0]?.id;
    addMaintenance({
      title: fd.get("title"),
      description: fd.get("description") || "",
      property_id,
      unit_id: fd.get("unit_id") || null,
      tenant_id: tenantOnly ?? null,
      category: fd.get("category") || "General",
      priority: fd.get("priority") || "medium"
    });
    toast.success("Request submitted");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-semibold tracking-tight", children: "Maintenance" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Track requests from open to resolved with staff assignments." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setOpen(true), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
        " New request"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(KPI, { label: "Open", value: stats.open, icon: Clock, tone: "warning" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KPI, { label: "In progress", value: stats.in_progress, icon: Wrench, tone: "info" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KPI, { label: "Resolved", value: stats.resolved, icon: CircleCheck, tone: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KPI, { label: "Urgent", value: stats.urgent, icon: TriangleAlert, tone: "danger" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DataTable, { rows, searchKeys: ["title", "category", "assigned_to"], searchPlaceholder: "Search requests…", filters: [{
      key: "status",
      label: "Status",
      options: [{
        value: "open",
        label: "Open"
      }, {
        value: "assigned",
        label: "Assigned"
      }, {
        value: "in_progress",
        label: "In progress"
      }, {
        value: "resolved",
        label: "Resolved"
      }, {
        value: "closed",
        label: "Closed"
      }]
    }, {
      key: "priority",
      label: "Priority",
      options: [{
        value: "low",
        label: "Low"
      }, {
        value: "medium",
        label: "Medium"
      }, {
        value: "high",
        label: "High"
      }, {
        value: "urgent",
        label: "Urgent"
      }]
    }], onRowClick: (r) => setActive(r), empty: "No maintenance requests.", columns: [{
      key: "title",
      label: "Request",
      render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: r.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
          r.category,
          " · ",
          propertyName(r.property_id),
          " ",
          r.unit_id ? `· ${unitLabel(r.unit_id)}` : ""
        ] })
      ] })
    }, {
      key: "priority",
      label: "Priority",
      render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsx(PriorityBadge, { p: r.priority })
    }, {
      key: "status",
      label: "Status",
      render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { s: r.status })
    }, {
      key: "assigned_to",
      label: "Assigned",
      hideOnMobile: true,
      render: (r) => r.assigned_to ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: r.assigned_to }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground italic", children: "Unassigned" })
    }, {
      key: "created_at",
      label: "Created",
      hideOnMobile: true
    }] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(FormModal, { open, onOpenChange: setOpen, title: "New maintenance request", submitLabel: "Submit request", onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "title", children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "title", name: "title", required: true, placeholder: "e.g. Leaking sink" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "category", children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { id: "category", name: "category", className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm", children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: c }, c)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "priority", children: "Priority" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { id: "priority", name: "priority", defaultValue: "medium", className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "low", children: "Low" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "medium", children: "Medium" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "high", children: "High" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "urgent", children: "Urgent" })
          ] })
        ] })
      ] }),
      !tenantOnly && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "property_id", children: "Property" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { id: "property_id", name: "property_id", className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm", children: data.properties.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p.id, children: p.name }, p.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "unit_id", children: "Unit (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { id: "unit_id", name: "unit_id", className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "—" }),
            data.units.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: u.id, children: u.label }, u.id))
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "description", children: "Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "description", name: "description", rows: 3, placeholder: "Describe the issue…" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: !!active, onOpenChange: (v) => !v && setActive(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(SheetContent, { className: "sm:max-w-lg overflow-y-auto", children: active && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { children: active.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetDescription, { children: [
          propertyName(active.property_id),
          " · ",
          unitLabel(active.unit_id)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PriorityBadge, { p: active.priority }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { s: active.status }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: active.category })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-4 text-sm leading-relaxed", children: active.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Tenant", value: tenantName(active.tenant_id) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Created", value: active.created_at }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Last update", value: active.updated_at }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Assigned to", value: active.assigned_to ?? "Unassigned" })
        ] }),
        !tenantOnly && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserCog, { className: "h-4 w-4" }),
            " Update workflow"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: active.status, onChange: (e) => {
                updateMaintenance(active.id, {
                  status: e.target.value
                });
                setActive({
                  ...active,
                  status: e.target.value
                });
                toast.success("Status updated");
              }, className: "h-9 w-full rounded-md border border-input bg-background px-2 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "open", children: "Open" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "assigned", children: "Assigned" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "in_progress", children: "In progress" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "resolved", children: "Resolved" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "closed", children: "Closed" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Assign staff" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: active.assigned_to ?? "", onChange: (e) => {
                const v = e.target.value || null;
                updateMaintenance(active.id, {
                  assigned_to: v,
                  status: v && active.status === "open" ? "assigned" : active.status
                });
                setActive({
                  ...active,
                  assigned_to: v,
                  status: v && active.status === "open" ? "assigned" : active.status
                });
                toast.success(v ? `Assigned to ${v}` : "Unassigned");
              }, className: "h-9 w-full rounded-md border border-input bg-background px-2 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Unassigned" }),
                STAFF.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: s }, s))
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }) }) })
  ] });
}
function Field({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium mt-0.5", children: value })
  ] });
}
function KPI({
  label,
  value,
  icon: Icon,
  tone
}) {
  const toneCls = {
    success: "bg-[oklch(0.94_0.07_160)] text-[oklch(0.35_0.12_160)]",
    warning: "bg-[oklch(0.95_0.08_75)] text-[oklch(0.4_0.13_75)]",
    danger: "bg-[oklch(0.93_0.09_25)] text-[oklch(0.4_0.18_25)]",
    info: "bg-primary/10 text-primary"
  }[tone];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-10 w-10 rounded-lg flex items-center justify-center ${toneCls}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-semibold", children: value })
    ] })
  ] });
}
export {
  MaintenanceView,
  PriorityBadge,
  StatusBadge,
  MaintenancePage as component
};
