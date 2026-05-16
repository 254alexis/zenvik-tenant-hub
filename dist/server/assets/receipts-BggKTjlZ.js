import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-_ixL3x3g.js";
import { u as useSession, A as AppLayout } from "./AppLayout--GaIKNag.js";
import { u as useStore, D as DataTable, B as Button, n as Download } from "./router-DMGhHKXf.js";
import { d as downloadReceipt } from "./receipt-BFHhi2Sh.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./api-ySu1tSp5.js";
function TenantReceipts() {
  const session = useSession();
  const tenantId = session?.user_id ? `t${session.user_id}` : "t1";
  const {
    data
  } = useStore();
  const rows = reactExports.useMemo(() => data.payments.filter((p) => p.tenant_id === tenantId).map((p) => {
    const tenant = data.tenants.find((t) => t.id === p.tenant_id);
    const unit = tenant ? data.units.find((u) => u.id === tenant.unit_id) : null;
    return {
      ...p,
      tenant_name: tenant?.name ?? "—",
      unit_label: unit?.label ?? null
    };
  }), [data, tenantId]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { allow: ["tenant"], children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-semibold tracking-tight", children: "Receipts" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Download proof of payment for any past transaction." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DataTable, { rows, searchKeys: ["id", "invoice_id", "method"], searchPlaceholder: "Search receipts…", empty: "No receipts yet.", columns: [{
      key: "id",
      label: "Receipt #"
    }, {
      key: "date",
      label: "Date"
    }, {
      key: "invoice_id",
      label: "Invoice",
      hideOnMobile: true
    }, {
      key: "method",
      label: "Method",
      hideOnMobile: true
    }, {
      key: "amount",
      label: "Amount",
      render: (r) => `$${r.amount.toLocaleString()}`
    }, {
      key: "actions",
      label: "",
      className: "text-right",
      render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => downloadReceipt({
        id: r.id,
        date: r.date,
        tenant: r.tenant_name,
        unit: r.unit_label,
        invoice_id: r.invoice_id,
        method: r.method,
        amount: r.amount
      }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4 mr-2" }),
        "Download"
      ] })
    }] })
  ] }) });
}
export {
  TenantReceipts as component
};
