export type Role = "super_admin" | "landlord" | "tenant" | "staff";

export interface Session {
  user_id: string;
  role: Role;
  landlord_id: string | null;
  name?: string;
  email?: string;
}

const KEY = "zv_session";

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function setSession(s: Session | null) {
  if (typeof window === "undefined") return;
  if (s) localStorage.setItem(KEY, JSON.stringify(s));
  else localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("zv:session"));
}

export const ROLE_HOME: Record<Role, string> = {
  super_admin: "/admin",
  landlord: "/landlord",
  tenant: "/tenant",
  staff: "/staff",
};

export const ROLE_LABEL: Record<Role, string> = {
  super_admin: "Super Admin",
  landlord: "Landlord",
  tenant: "Tenant",
  staff: "Staff",
};
