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

const initial = {
  properties: [
    { id: "p1", name: "Riverside Apartments", address: "120 River Rd", units: 18, type: "Residential" },
    { id: "p2", name: "Northgate Tower", address: "44 Northgate Ave", units: 24, type: "Residential" },
    { id: "p3", name: "Eastview Lofts", address: "9 East Plaza", units: 12, type: "Mixed-use" },
  ] as Property[],
  units: [
    { id: "u1", property_id: "p1", label: "Apt 4B", bedrooms: 2, rent: 2400, status: "occupied" },
    { id: "u2", property_id: "p1", label: "Apt 4C", bedrooms: 1, rent: 1800, status: "vacant" },
    { id: "u3", property_id: "p1", label: "Apt 5A", bedrooms: 3, rent: 3200, status: "maintenance" },
    { id: "u4", property_id: "p2", label: "Apt 12", bedrooms: 2, rent: 1850, status: "occupied" },
    { id: "u5", property_id: "p2", label: "Apt 14", bedrooms: 1, rent: 1500, status: "vacant" },
    { id: "u6", property_id: "p3", label: "Loft 7A", bedrooms: 2, rent: 2100, status: "occupied" },
  ] as Unit[],
  tenants: [
    { id: "t1", name: "Sarah Chen", email: "sarah@example.com", phone: "+1 555 0142", unit_id: "u1" },
    { id: "t2", name: "Marcus Webb", email: "marcus@example.com", phone: "+1 555 0188", unit_id: "u4" },
    { id: "t3", name: "Lina Park", email: "lina@example.com", phone: "+1 555 0211", unit_id: "u6" },
    { id: "t4", name: "Diego Romero", email: "diego@example.com", phone: "+1 555 0299", unit_id: null },
  ] as Tenant[],
  invoices: [
    { id: "inv-2041", tenant_id: "t1", period: "Nov 2025", amount: 2400, due: "2025-11-01", status: "pending" },
    { id: "inv-2018", tenant_id: "t1", period: "Oct 2025", amount: 2400, due: "2025-10-01", status: "paid" },
    { id: "inv-2042", tenant_id: "t2", period: "Nov 2025", amount: 1850, due: "2025-11-01", status: "paid" },
    { id: "inv-2043", tenant_id: "t3", period: "Nov 2025", amount: 2100, due: "2025-11-01", status: "overdue" },
  ] as Invoice[],
  payments: [
    { id: "pay-501", tenant_id: "t1", invoice_id: "inv-2018", amount: 2400, method: "Card", date: "2025-10-01" },
    { id: "pay-502", tenant_id: "t2", invoice_id: "inv-2042", amount: 1850, method: "Bank transfer", date: "2025-11-01" },
  ] as Payment[],
  notifications: [
    { id: "n1", title: "New maintenance request", body: "Apt 4B reported a leaking faucet.", date: "2h ago", status: "unread" },
    { id: "n2", title: "Payment received", body: "Marcus Webb paid $1,850.", date: "1d ago", status: "unread" },
    { id: "n3", title: "Lease renewal upcoming", body: "Lina Park's lease ends in 60 days.", date: "3d ago", status: "read" },
  ] as Notification[],
  documents: [
    { id: "d1", name: "Lease - Sarah Chen.pdf", category: "lease", size_kb: 412, uploaded_at: "2025-09-12", uploaded_by: "Admin", tenant_id: "t1", property_id: "p1" },
    { id: "d2", name: "Building insurance 2025.pdf", category: "policy", size_kb: 1280, uploaded_at: "2025-08-04", uploaded_by: "Admin", property_id: "p2" },
    { id: "d3", name: "Marcus Webb - ID.jpg", category: "id", size_kb: 220, uploaded_at: "2025-07-21", uploaded_by: "Tenant", tenant_id: "t2" },
    { id: "d4", name: "Invoice INV-2018.pdf", category: "invoice", size_kb: 96, uploaded_at: "2025-10-01", uploaded_by: "System", tenant_id: "t1" },
    { id: "d5", name: "Receipt PAY-501.pdf", category: "receipt", size_kb: 88, uploaded_at: "2025-10-01", uploaded_by: "System", tenant_id: "t1" },
  ] as Document[],
  maintenance: [
    { id: "m1", title: "Leaking kitchen faucet", description: "Constant drip from cold tap.", property_id: "p1", unit_id: "u1", tenant_id: "t1", category: "Plumbing", priority: "medium", status: "assigned", assigned_to: "James Carter", created_at: "2025-11-04", updated_at: "2025-11-05" },
    { id: "m2", title: "AC unit not cooling", description: "Living room AC blows warm air.", property_id: "p2", unit_id: "u4", tenant_id: "t2", category: "HVAC", priority: "high", status: "in_progress", assigned_to: "Priya Patel", created_at: "2025-11-02", updated_at: "2025-11-06" },
    { id: "m3", title: "Broken window latch", description: "Bedroom window won't lock.", property_id: "p3", unit_id: "u6", tenant_id: "t3", category: "General", priority: "low", status: "open", assigned_to: null, created_at: "2025-11-08", updated_at: "2025-11-08" },
    { id: "m4", title: "Power outage in bathroom", description: "Outlet trips breaker.", property_id: "p1", unit_id: "u3", tenant_id: null, category: "Electrical", priority: "urgent", status: "resolved", assigned_to: "James Carter", created_at: "2025-10-22", updated_at: "2025-10-25" },
  ] as MaintenanceRequest[],
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
