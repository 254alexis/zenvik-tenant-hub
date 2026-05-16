import { useState, useEffect, useCallback } from "react";

export type Property = { id: string; name: string; address: string; units: number; type: string };
export type Unit = { id: string; property_id: string; label: string; bedrooms: number; rent: number; status: "occupied" | "vacant" | "maintenance" };
export type Tenant = { id: string; name: string; email: string; phone: string; unit_id: string | null };
export type Invoice = { id: string; tenant_id: string; period: string; amount: number; due: string; status: "paid" | "pending" | "overdue" };
export type Payment = { id: string; tenant_id: string; invoice_id: string; amount: number; method: string; date: string };
export type Notification = { id: string; title: string; body: string; date: string; status: "unread" | "read" };
export type DocCategory = "lease" | "id" | "invoice" | "receipt" | "policy" | "other";
export type Document = {
  id: string;
  name: string;
  category: DocCategory;
  size_kb: number;
  uploaded_at: string;
  uploaded_by: string;
  property_id?: string | null;
  tenant_id?: string | null;
  url?: string;
};
export type MaintPriority = "low" | "medium" | "high" | "urgent";
export type MaintStatus = "open" | "assigned" | "in_progress" | "resolved" | "closed";
export type MaintenanceRequest = {
  id: string;
  title: string;
  description: string;
  property_id: string;
  unit_id: string | null;
  tenant_id: string | null;
  category: string;
  priority: MaintPriority;
  status: MaintStatus;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
};

// No demo / mock seed data. All real records must come from the PHP/MySQL
// backend at VITE_API_BASE_URL. This local store only holds optimistic
// in-memory additions made through the UI; it is NOT a data source.
const initial = {
  properties: [] as Property[],
  units: [] as Unit[],
  tenants: [] as Tenant[],
  invoices: [] as Invoice[],
  payments: [] as Payment[],
  notifications: [] as Notification[],
  documents: [] as Document[],
  maintenance: [] as MaintenanceRequest[],
};

let store = structuredClone(initial);
const subs = new Set<() => void>();
const notify = () => subs.forEach((fn) => fn());

export function useStore() {
  const [, setT] = useState(0);
  useEffect(() => {
    const fn = () => setT((n) => n + 1);
    subs.add(fn);
    return () => {
      subs.delete(fn);
    };
  }, []);

  const id = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 8)}`;

  return {
    data: store,
    addProperty: useCallback((p: Omit<Property, "id">) => {
      store.properties = [...store.properties, { ...p, id: id("p") }];
      notify();
    }, []),
    addUnit: useCallback((u: Omit<Unit, "id">) => {
      store.units = [...store.units, { ...u, id: id("u") }];
      notify();
    }, []),
    addTenant: useCallback((t: Omit<Tenant, "id">) => {
      store.tenants = [...store.tenants, { ...t, id: id("t") }];
      notify();
    }, []),
    assignUnit: useCallback((tenant_id: string, unit_id: string | null) => {
      store.tenants = store.tenants.map((t) => (t.id === tenant_id ? { ...t, unit_id } : t));
      if (unit_id) {
        store.units = store.units.map((u) => (u.id === unit_id ? { ...u, status: "occupied" } : u));
      }
      notify();
    }, []),
    addInvoice: useCallback((i: Omit<Invoice, "id">) => {
      store.invoices = [...store.invoices, { ...i, id: id("inv") }];
      notify();
    }, []),
    recordPayment: useCallback((p: Omit<Payment, "id">) => {
      store.payments = [...store.payments, { ...p, id: id("pay") }];
      store.invoices = store.invoices.map((inv) => (inv.id === p.invoice_id ? { ...inv, status: "paid" } : inv));
      notify();
    }, []),
    markRead: useCallback((nid: string) => {
      store.notifications = store.notifications.map((n) => (n.id === nid ? { ...n, status: "read" } : n));
      notify();
    }, []),
    markAllRead: useCallback(() => {
      store.notifications = store.notifications.map((n) => ({ ...n, status: "read" as const }));
      notify();
    }, []),
    addDocument: useCallback((d: Omit<Document, "id" | "uploaded_at">) => {
      store.documents = [
        { ...d, id: id("d"), uploaded_at: new Date().toISOString().slice(0, 10) },
        ...store.documents,
      ];
      notify();
    }, []),
    deleteDocument: useCallback((did: string) => {
      store.documents = store.documents.filter((d) => d.id !== did);
      notify();
    }, []),
    addMaintenance: useCallback((m: Omit<MaintenanceRequest, "id" | "created_at" | "updated_at" | "status" | "assigned_to"> & Partial<Pick<MaintenanceRequest, "status" | "assigned_to">>) => {
      const today = new Date().toISOString().slice(0, 10);
      store.maintenance = [
        {
          ...m,
          id: id("m"),
          status: m.status ?? "open",
          assigned_to: m.assigned_to ?? null,
          created_at: today,
          updated_at: today,
        },
        ...store.maintenance,
      ];
      notify();
    }, []),
    updateMaintenance: useCallback((mid: string, patch: Partial<MaintenanceRequest>) => {
      const today = new Date().toISOString().slice(0, 10);
      store.maintenance = store.maintenance.map((m) =>
        m.id === mid ? { ...m, ...patch, updated_at: today } : m,
      );
      notify();
    }, []),
  };
}
