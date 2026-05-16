import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-_ixL3x3g.js";
import { U as Users, H as House, A as AppLayout, a as Avatar, b as AvatarFallback } from "./AppLayout--GaIKNag.js";
import { c as createLucideIcon, u as useStore, a as CircleAlert, B as Button, P as Plus, C as Card, D as DataTable, F as FormModal, L as Label, I as Input, b as Sheet, d as SheetContent, e as SheetHeader, f as SheetTitle, g as SheetDescription, S as StatusBadge, t as toast } from "./router-DMGhHKXf.js";
import { u as useApiList, E as ENDPOINTS, a as apiPost } from "./apiClient-BKY6RsTL.js";
import { M as Mail } from "./mail-VPrjysX9.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./api-ySu1tSp5.js";
const __iconNode$2 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode$2);
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8", key: "1h4pet" }],
  ["path", { d: "M12 18V6", key: "zqpxq5" }]
];
const CircleDollarSign = createLucideIcon("circle-dollar-sign", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode);
const initialForm = {
  name: "",
  email: "",
  phone: "",
  unit_id: "",
  lease_start: "",
  lease_end: ""
};
function TenantsPage() {
  const {
    data: store,
    addTenant
  } = useStore();
  const remoteTenants = useApiList(ENDPOINTS.tenants);
  const remoteUnits = useApiList(ENDPOINTS.units);
  const remoteInvoices = useApiList(ENDPOINTS.invoices);
  const [openAdd, setOpenAdd] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState(initialForm);
  const [saving, setSaving] = reactExports.useState(false);
  const [active, setActive] = reactExports.useState(null);
  const units = reactExports.useMemo(() => {
    const r = (remoteUnits.data ?? []).map((u, i) => ({
      id: String(u.id ?? u.unit_id ?? `u${i}`),
      label: u.label ?? u.name ?? "Unit",
      property_id: String(u.property_id ?? ""),
      rent: Number(u.rent ?? u.amount ?? 0),
      status: (u.status ?? "vacant").toLowerCase()
    }));
    return r.length ? r : store.units;
  }, [remoteUnits.data, store.units]);
  const properties = store.properties;
  const tenants = reactExports.useMemo(() => {
    const remoteList = (remoteTenants.data ?? []).map((t, i) => ({
      id: String(t.id ?? t.tenant_id ?? `t${i}`),
      name: t.name ?? t.full_name ?? "Tenant",
      email: t.email ?? "",
      phone: t.phone ?? t.phone_number ?? "",
      unit_id: t.unit_id ? String(t.unit_id) : null,
      lease_start: t.lease_start ?? t.start_date ?? "",
      lease_end: t.lease_end ?? t.end_date ?? "",
      move_out: t.move_out ?? null
    }));
    const base = remoteList.length ? remoteList : store.tenants.map((t) => ({
      ...t,
      lease_start: "2025-01-01",
      lease_end: "2025-12-31",
      move_out: null
    }));
    const invoiceList = remoteInvoices.data ?? store.invoices;
    return base.map((t) => {
      const unit = units.find((u) => u.id === t.unit_id);
      const property = unit ? properties.find((p) => p.id === unit.property_id) : null;
      const tenantInvoices = invoiceList.filter((inv) => String(inv.tenant_id) === String(t.id));
      const overdue = tenantInvoices.find((i) => (i.status ?? "").toLowerCase() === "overdue");
      const pending = tenantInvoices.find((i) => (i.status ?? "").toLowerCase() === "pending");
      const balance = tenantInvoices.filter((i) => (i.status ?? "").toLowerCase() !== "paid").reduce((a, i) => a + Number(i.amount ?? 0), 0);
      const payment_status = overdue ? "overdue" : pending ? "pending" : "paid";
      return {
        id: t.id,
        name: t.name,
        email: t.email,
        phone: t.phone,
        unit_id: t.unit_id,
        unit_label: unit?.label ?? "—",
        property_name: property?.name ?? "—",
        rent: Number(unit?.rent ?? 0),
        lease_start: t.lease_start ?? "",
        lease_end: t.lease_end ?? "",
        move_out: t.move_out ?? null,
        payment_status,
        balance
      };
    });
  }, [remoteTenants.data, store.tenants, remoteInvoices.data, store.invoices, units, properties]);
  const stats = reactExports.useMemo(() => {
    const overdue = tenants.filter((t) => t.payment_status === "overdue").length;
    const active2 = tenants.filter((t) => !t.move_out).length;
    return [{
      label: "Total tenants",
      value: tenants.length,
      icon: Users
    }, {
      label: "Active leases",
      value: active2,
      icon: House
    }, {
      label: "On time",
      value: tenants.filter((t) => t.payment_status === "paid").length,
      icon: CircleDollarSign
    }, {
      label: "Overdue",
      value: overdue,
      icon: CircleAlert
    }];
  }, [tenants]);
  const vacantUnits = units.filter((u) => u.status !== "occupied");
  const submit = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Name and email are required");
      return;
    }
    setSaving(true);
    try {
      try {
        await apiPost(ENDPOINTS.addTenant, {
          name: form.name,
          email: form.email,
          phone: form.phone,
          unit_id: form.unit_id || null,
          lease_start: form.lease_start || null,
          lease_end: form.lease_end || null
        });
        toast.success("Tenant created");
        remoteTenants.reload();
      } catch {
        addTenant({
          name: form.name,
          email: form.email,
          phone: form.phone,
          unit_id: form.unit_id || null
        });
        toast.success("Tenant added locally");
      }
      setForm(initialForm);
      setOpenAdd(false);
    } finally {
      setSaving(false);
    }
  };
  const columns = [{
    key: "name",
    label: "Tenant",
    render: (t) => {
      const initials = t.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-9 w-9", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-primary/10 text-primary text-xs font-medium", children: initials }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium truncate", children: t.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground truncate", children: t.email })
        ] })
      ] });
    }
  }, {
    key: "unit",
    label: "Unit",
    render: (t) => t.unit_id ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: t.unit_label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: t.property_name })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "Unassigned" })
  }, {
    key: "lease_end",
    label: "Lease ends",
    render: (t) => t.lease_end ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground tabular-nums", children: t.lease_end }) : "—"
  }, {
    key: "payment_status",
    label: "Payment",
    render: (t) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: t.payment_status })
  }, {
    key: "balance",
    label: "Balance",
    className: "text-right",
    render: (t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `tabular-nums font-medium ${t.balance > 0 ? "text-[oklch(0.5_0.18_25)]" : "text-muted-foreground"}`, children: [
      "$",
      t.balance.toLocaleString()
    ] })
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { allow: ["landlord", "super_admin"], children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-7xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-semibold tracking-tight", children: "Tenants" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-1", children: [
          tenants.length,
          " tenants across your portfolio"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setOpenAdd(true), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
        " Add tenant"
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
    /* @__PURE__ */ jsxRuntimeExports.jsx(DataTable, { rows: tenants, columns, loading: remoteTenants.loading, error: remoteTenants.error, onRetry: remoteTenants.reload, searchKeys: ["name", "email", "phone", "unit_label", "property_name"], searchPlaceholder: "Search tenants by name, email, unit…", filters: [{
      key: "payment_status",
      label: "Payment",
      options: [{
        value: "paid",
        label: "Paid"
      }, {
        value: "pending",
        label: "Pending"
      }, {
        value: "overdue",
        label: "Overdue"
      }]
    }], onRowClick: (t) => setActive(t), empty: "No tenants yet." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(FormModal, { open: openAdd, onOpenChange: setOpenAdd, title: "Add tenant", submitLabel: saving ? "Saving…" : "Create", onSubmit: submit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Full name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.name, onChange: (e) => setForm({
          ...form,
          name: e.target.value
        }), maxLength: 100, required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", value: form.email, onChange: (e) => setForm({
            ...form,
            email: e.target.value
          }), maxLength: 255, required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Phone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.phone, onChange: (e) => setForm({
            ...form,
            phone: e.target.value
          }), maxLength: 32 })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Assign unit (optional)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "w-full h-10 rounded-md border border-input bg-background px-3 text-sm", value: form.unit_id, onChange: (e) => setForm({
          ...form,
          unit_id: e.target.value
        }), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "— None —" }),
          vacantUnits.map((u) => {
            const p = properties.find((pp) => pp.id === u.property_id);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: u.id, children: [
              u.label,
              " · ",
              p?.name
            ] }, u.id);
          })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Lease start" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: form.lease_start, onChange: (e) => setForm({
            ...form,
            lease_start: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Lease end" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: form.lease_end, onChange: (e) => setForm({
            ...form,
            lease_end: e.target.value
          }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: !!active, onOpenChange: (v) => !v && setActive(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(SheetContent, { className: "w-full sm:max-w-md overflow-y-auto", children: active && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { className: "text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-12 w-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-primary/10 text-primary font-medium", children: active.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase() }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { children: active.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SheetDescription, { children: "Tenant profile" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wide text-muted-foreground font-medium", children: "Contact" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4 text-muted-foreground" }),
            " ",
            active.email || "—"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4 text-muted-foreground" }),
            " ",
            active.phone || "—"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wide text-muted-foreground font-medium", children: "Lease" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "h-4 w-4 text-muted-foreground" }),
            active.unit_id ? `${active.unit_label} · ${active.property_name}` : "Unassigned"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Move-in" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium tabular-nums flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-3.5 w-3.5" }),
                active.lease_start || "—"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: active.move_out ? "Move-out" : "Lease ends" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium tabular-nums flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-3.5 w-3.5" }),
                active.move_out || active.lease_end || "—"
              ] })
            ] })
          ] }),
          active.rent > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm pt-2 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Monthly rent: " }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold tabular-nums", children: [
              "$",
              active.rent.toLocaleString()
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wide text-muted-foreground font-medium", children: "Payment status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: active.payment_status }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Outstanding" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `font-semibold tabular-nums ${active.balance > 0 ? "text-[oklch(0.5_0.18_25)]" : ""}`, children: [
                "$",
                active.balance.toLocaleString()
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }) }) })
  ] }) });
}
export {
  TenantsPage as component
};
