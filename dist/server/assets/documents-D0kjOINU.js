import { U as jsxRuntimeExports } from "./worker-entry-_ixL3x3g.js";
import { u as useSession, A as AppLayout } from "./AppLayout--GaIKNag.js";
import { K as DocumentsView } from "./router-DMGhHKXf.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./api-ySu1tSp5.js";
function TenantDocuments() {
  const session = useSession();
  const tenantId = session?.user_id ? `t${session.user_id}` : "t1";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { allow: ["tenant"], children: /* @__PURE__ */ jsxRuntimeExports.jsx(DocumentsView, { tenantOnly: tenantId }) });
}
export {
  TenantDocuments as component
};
