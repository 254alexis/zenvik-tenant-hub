import { useEffect, useRef, useState, useCallback } from "react";
import { apiFetch } from "@/lib/api";
import { getSession } from "@/lib/session";

/**
 * Normalize various API response shapes to an array.
 * Handles: [...], { data: [...] }, { items: [...] }, { results: [...] }
 */
function asArray<T>(res: any): T[] {
  if (Array.isArray(res)) return res;
  if (res && typeof res === "object") {
    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.items)) return res.items;
    if (Array.isArray(res.results)) return res.results;
  }
  return [];
}

/**
 * GET-style POST: backend expects JSON body with user_id for every call.
 */
export function useApiList<T = any>(endpoint: string, extra: Record<string, unknown> = {}) {
  const [data, setData] = useState<T[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const extraRef = useRef(extra);
  extraRef.current = extra;

  const load = useCallback(async () => {
    const session = getSession();
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch<any>(endpoint, {
        method: "POST",
        body: JSON.stringify({
          user_id: session?.user_id ?? null,
          role: session?.role ?? null,
          landlord_id: session?.landlord_id ?? null,
          ...extraRef.current,
        }),
      });
      if (res && res.success === false) {
        throw new Error(res.message || res.error || "Request failed");
      }
      setData(asArray<T>(res));
    } catch (e: any) {
      setError(e?.message || "Network error");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, error, loading, reload: load };
}

/**
 * Mutating call (e.g. add payment). Always injects session user_id.
 */
export async function apiPost<T = any>(endpoint: string, payload: Record<string, unknown> = {}): Promise<T> {
  const session = getSession();
  const res = await apiFetch<any>(endpoint, {
    method: "POST",
    body: JSON.stringify({
      user_id: session?.user_id ?? null,
      role: session?.role ?? null,
      landlord_id: session?.landlord_id ?? null,
      ...payload,
    }),
  });
  if (res && res.success === false) {
    throw new Error(res.message || res.error || "Request failed");
  }
  return res as T;
}

export const ENDPOINTS = {
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
  updateMaintenance: "/maintenance/update.php",
} as const;
