import { r as reactExports } from "./worker-entry-_ixL3x3g.js";
import { a as apiFetch } from "./api-ySu1tSp5.js";
import { J as getSession } from "./router-DMGhHKXf.js";
function asArray(res) {
  if (Array.isArray(res)) return res;
  if (res && typeof res === "object") {
    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.items)) return res.items;
    if (Array.isArray(res.results)) return res.results;
  }
  return [];
}
function useApiList(endpoint, extra = {}) {
  const [data, setData] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const extraRef = reactExports.useRef(extra);
  extraRef.current = extra;
  const load = reactExports.useCallback(async () => {
    const session = getSession();
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch(endpoint, {
        method: "POST",
        body: JSON.stringify({
          user_id: session?.user_id ?? null,
          role: session?.role ?? null,
          landlord_id: session?.landlord_id ?? null,
          ...extraRef.current
        })
      });
      if (res && res.success === false) {
        throw new Error(res.message || res.error || "Request failed");
      }
      setData(asArray(res));
    } catch (e) {
      setError(e?.message || "Network error");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);
  reactExports.useEffect(() => {
    load();
  }, [load]);
  return { data, error, loading, reload: load };
}
async function apiPost(endpoint, payload = {}) {
  const session = getSession();
  const res = await apiFetch(endpoint, {
    method: "POST",
    body: JSON.stringify({
      user_id: session?.user_id ?? null,
      role: session?.role ?? null,
      landlord_id: session?.landlord_id ?? null,
      ...payload
    })
  });
  if (res && res.success === false) {
    throw new Error(res.message || res.error || "Request failed");
  }
  return res;
}
const ENDPOINTS = {
  properties: "/properties/list.php",
  addProperty: "/properties/add.php",
  updateProperty: "/properties/update.php",
  units: "/units/list.php",
  tenants: "/tenants/list.php",
  addTenant: "/tenants/add.php",
  invoices: "/invoices/list.php",
  addInvoice: "/invoices/add.php",
  payments: "/payments/list.php",
  addPayment: "/payments/add.php",
  expenses: "/expenses/list.php",
  addExpense: "/expenses/add.php",
  arrears: "/analytics/arrears.php",
  finance: "/analytics/finance.php",
  notifications: "/notifications/list.php",
  documents: "/documents/list.php",
  uploadDocument: "/documents/upload.php",
  deleteDocument: "/documents/delete.php",
  maintenance: "/maintenance/list.php",
  addMaintenance: "/maintenance/add.php",
  updateMaintenance: "/maintenance/update.php"
};
export {
  ENDPOINTS as E,
  apiPost as a,
  useApiList as u
};
