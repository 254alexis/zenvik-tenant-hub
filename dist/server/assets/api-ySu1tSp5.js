import { c as createLucideIcon } from "./router-DMGhHKXf.js";
const __iconNode = [
  ["path", { d: "M10 12h4", key: "a56b0p" }],
  ["path", { d: "M10 8h4", key: "1sr2af" }],
  ["path", { d: "M14 21v-3a2 2 0 0 0-4 0v3", key: "1rgiei" }],
  [
    "path",
    {
      d: "M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2",
      key: "secmi2"
    }
  ],
  ["path", { d: "M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16", key: "16ra0t" }]
];
const Building2 = createLucideIcon("building-2", __iconNode);
const API_BASE = "https://tenant.zenviktechnologies.com/api";
function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("zv_token");
}
function setToken(token) {
  if (typeof window === "undefined") return;
  if (token) localStorage.setItem("zv_token", token);
  else localStorage.removeItem("zv_token");
}
async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...options.headers
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  if (!res.ok) {
    const msg = data && (data.message || data.error) || `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data;
}
export {
  Building2 as B,
  apiFetch as a,
  setToken as s
};
