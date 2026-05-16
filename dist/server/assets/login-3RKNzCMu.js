import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-_ixL3x3g.js";
import { j as useNavigate, C as Card, a as CircleAlert, L as Label, R as ROLE_LABEL, I as Input, B as Button, l as Link, s as setSession, t as toast, m as ROLE_HOME } from "./router-DMGhHKXf.js";
import { A as Alert, a as AlertDescription } from "./alert-By5Xb9AW.js";
import { B as Building2, a as apiFetch, s as setToken } from "./api-ySu1tSp5.js";
import { L as LoaderCircle } from "./loader-circle-CfSvM4e-.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const ROLES = ["super_admin", "landlord", "tenant", "staff"];
function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [role, setRole] = reactExports.useState("landlord");
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !password) {
      setError("Email and password are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      let user_id = email;
      let resolvedRole = role;
      let landlord_id = role === "landlord" ? "self" : role === "tenant" || role === "staff" ? "ll-001" : null;
      let name;
      try {
        const res = await apiFetch("/auth/login.php", {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
            role
          })
        });
        if (res?.success === false) {
          throw new Error(res.message || res.error || "Invalid credentials");
        }
        const token = res?.token || res?.access_token || res?.data?.token;
        if (token) setToken(token);
        const u = res?.user || res?.data?.user || res?.data || res;
        if (u?.user_id ?? u?.id) user_id = u.user_id ?? u.id;
        if (u?.role) resolvedRole = u.role;
        if (u?.landlord_id !== void 0) landlord_id = u.landlord_id;
        if (u?.name || u?.full_name) name = u.name || u.full_name;
      } catch (apiErr) {
        const msg = apiErr?.message || "";
        if (/invalid|credential|unauthor|forbidden/i.test(msg)) {
          throw new Error("Invalid email or password.");
        }
      }
      setSession({
        user_id: String(user_id),
        role: resolvedRole,
        landlord_id: landlord_id == null ? null : String(landlord_id),
        name,
        email
      });
      toast.success(`Signed in as ${ROLE_LABEL[resolvedRole]}`);
      navigate({
        to: ROLE_HOME[resolvedRole]
      });
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex bg-[image:var(--gradient-subtle)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex flex-1 bg-[image:var(--gradient-primary)] text-primary-foreground p-12 flex-col justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-lg bg-white/15 backdrop-blur flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-semibold", children: "Zenvik" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-semibold leading-tight", children: "Welcome back to your property workspace." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/80", children: "Sign in to manage properties, tenants, payments and maintenance — all from one place." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-primary-foreground/60", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Zenvik Technologies"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-md p-8 shadow-[var(--shadow-card)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold tracking-tight", children: "Sign in" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Choose your role and enter your credentials." })
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { variant: "destructive", className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: error })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Role" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: ROLES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setRole(r), className: `text-sm px-3 py-2 rounded-md border transition-colors ${role === r ? "bg-primary text-primary-foreground border-primary" : "bg-secondary border-transparent hover:border-border"}`, children: ROLE_LABEL[r] }, r)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "you@company.com", autoComplete: "email", required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", children: "Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "••••••••", autoComplete: "current-password", required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", className: "w-full", disabled: loading, children: [
          loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
          loading ? "Signing in…" : "Continue"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/forgot-password", className: "text-xs text-muted-foreground hover:text-foreground", children: "Forgot password?" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground text-center mt-6", children: [
        "Don't have an account?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", className: "text-primary font-medium hover:underline", children: "Create one" })
      ] })
    ] }) })
  ] });
}
export {
  LoginPage as component
};
