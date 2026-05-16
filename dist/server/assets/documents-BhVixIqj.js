import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-_ixL3x3g.js";
import { A as AppLayout } from "./AppLayout--GaIKNag.js";
import { u as useStore, B as Button, w as Upload, C as Card, D as DataTable, E as Eye, t as toast, n as Download, x as Trash2, F as FormModal, L as Label, I as Input, y as FileImage, z as FileSpreadsheet, r as FileText, A as File } from "./router-DMGhHKXf.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./api-ySu1tSp5.js";
const CATEGORIES = [{
  value: "lease",
  label: "Lease"
}, {
  value: "id",
  label: "ID / KYC"
}, {
  value: "invoice",
  label: "Invoice"
}, {
  value: "receipt",
  label: "Receipt"
}, {
  value: "policy",
  label: "Policy"
}, {
  value: "other",
  label: "Other"
}];
const CAT_TONE = {
  lease: "bg-primary/10 text-primary",
  id: "bg-[oklch(0.94_0.07_280)] text-[oklch(0.4_0.17_280)]",
  invoice: "bg-[oklch(0.95_0.08_75)] text-[oklch(0.4_0.13_75)]",
  receipt: "bg-[oklch(0.94_0.07_160)] text-[oklch(0.35_0.12_160)]",
  policy: "bg-[oklch(0.93_0.07_220)] text-[oklch(0.38_0.15_220)]",
  other: "bg-secondary text-muted-foreground"
};
function iconFor(name) {
  const ext = name.split(".").pop()?.toLowerCase();
  if (["jpg", "jpeg", "png", "webp", "gif"].includes(ext || "")) return FileImage;
  if (["xls", "xlsx", "csv"].includes(ext || "")) return FileSpreadsheet;
  if (ext === "pdf") return FileText;
  return File;
}
function DocumentsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { allow: ["super_admin", "landlord", "staff"], children: /* @__PURE__ */ jsxRuntimeExports.jsx(DocumentsView, {}) });
}
function DocumentsView({
  tenantOnly
} = {}) {
  const {
    data,
    addDocument,
    deleteDocument
  } = useStore();
  const [open, setOpen] = reactExports.useState(false);
  const fileRef = reactExports.useRef(null);
  const [picked, setPicked] = reactExports.useState(null);
  const rows = reactExports.useMemo(() => tenantOnly ? data.documents.filter((d) => d.tenant_id === tenantOnly || d.category === "policy") : data.documents, [data.documents, tenantOnly]);
  const handleSubmit = (e) => {
    const fd = new FormData(e.currentTarget);
    const name = picked?.name || fd.get("name");
    if (!name) {
      toast.error("Choose a file to upload");
      return;
    }
    addDocument({
      name,
      category: fd.get("category") || "other",
      size_kb: picked ? Math.max(1, Math.round(picked.size / 1024)) : 100,
      uploaded_by: "You",
      tenant_id: tenantOnly ?? null
    });
    setPicked(null);
    toast.success("Document uploaded");
  };
  const stats = reactExports.useMemo(() => {
    const byCat = {};
    rows.forEach((d) => byCat[d.category] = (byCat[d.category] || 0) + 1);
    return byCat;
  }, [rows]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-semibold tracking-tight", children: "Documents" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Leases, IDs, policies, invoices and receipts in one place." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setOpen(true), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4 mr-2" }),
        " Upload document"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-6 gap-3", children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground capitalize", children: c.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-semibold mt-1", children: stats[c.value] || 0 })
    ] }, c.value)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DataTable, { rows, searchKeys: ["name", "uploaded_by"], searchPlaceholder: "Search documents…", filters: [{
      key: "category",
      label: "Category",
      options: CATEGORIES
    }], empty: "No documents uploaded yet.", columns: [{
      key: "name",
      label: "Name",
      render: (r) => {
        const Icon = iconFor(r.name);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-md bg-secondary flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium truncate", children: r.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              r.size_kb,
              " KB"
            ] })
          ] })
        ] });
      }
    }, {
      key: "category",
      label: "Category",
      render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium capitalize ${CAT_TONE[r.category]}`, children: r.category })
    }, {
      key: "uploaded_by",
      label: "Uploaded by",
      hideOnMobile: true
    }, {
      key: "uploaded_at",
      label: "Date",
      hideOnMobile: true
    }, {
      key: "actions",
      label: "",
      className: "text-right",
      render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", "aria-label": "Preview", onClick: () => toast.info(`Preview: ${r.name}`), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", "aria-label": "Download", onClick: () => toast.success(`Downloading ${r.name}`), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }) }),
        !tenantOnly && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", "aria-label": "Delete", onClick: () => {
          deleteDocument(r.id);
          toast.success("Document removed");
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
      ] })
    }] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(FormModal, { open, onOpenChange: setOpen, title: "Upload document", description: "Attach a file and assign it to a category.", submitLabel: "Upload", onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:bg-secondary/40 transition-colors", onClick: () => fileRef.current?.click(), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-6 w-6 mx-auto text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-sm font-medium", children: picked ? picked.name : "Click to choose a file" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: "PDF, DOCX, JPG up to 10 MB" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: fileRef, type: "file", className: "hidden", onChange: (e) => {
          const f = e.target.files?.[0];
          if (f) setPicked({
            name: f.name,
            size: f.size
          });
        } })
      ] }),
      !picked && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "Or enter file name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "name", name: "name", placeholder: "e.g. Lease Agreement.pdf" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "category", children: "Category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("select", { id: "category", name: "category", defaultValue: "other", className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm", children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.value, children: c.label }, c.value)) })
      ] })
    ] })
  ] });
}
export {
  DocumentsView,
  DocumentsPage as component
};
