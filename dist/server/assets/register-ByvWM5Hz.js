import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-_ixL3x3g.js";
import { j as useNavigate, C as Card, a as CircleAlert, k as CircleCheck, L as Label, I as Input, R as ROLE_LABEL, B as Button, l as Link, s as setSession, t as toast, m as ROLE_HOME } from "./router-DMGhHKXf.js";
import { A as Alert, a as AlertDescription } from "./alert-By5Xb9AW.js";
import { B as Building2, a as apiFetch, s as setToken } from "./api-ySu1tSp5.js";
import { L as LoaderCircle } from "./loader-circle-CfSvM4e-.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const ROLES = ["landlord", "tenant", "staff"];
function RegisterPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [confirm, setConfirm] = reactExports.useState("");
  const [role, setRole] = reactExports.useState("landlord");
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [success, setSuccess] = reactExports.useState(null);
  const validate = () => {
    if (!fullName.trim()) return "Full name is required.";
    if (fullName.trim().length > 100) return "Full name is too long.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email.";
    if (!/^[+\d][\d\s\-()]{6,20}$/.test(phone)) return "Enter a valid phone number.";
    if (password.length < 8) return "Password must be at least 8 characters.";
    if (password !== confirm) return "Passwords do not match.";
    return null;
  };
  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setLoading(true);
    try {
      const payload = {
        full_name: fullName.trim(),
        name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
        role
      };
      let user_id = email;
      let landlord_id = role === "landlord" ? "self" : null;
      let token;
      try {
        const res = await apiFetch("/auth/register.php", {
          method: "POST",
          body: JSON.stringify(payload)
        });
        if (res?.success === false) {
          throw new Error(res.message || res.error || "Registration failed");
        }
        const u = res?.user || res?.data?.user || res?.data || res;
        if (u?.user_id ?? u?.id) user_id = u.user_id ?? u.id;
        if (u?.landlord_id !== void 0) landlord_id = u.landlord_id;
        token = res?.token || res?.access_token || res?.data?.token;
      } catch (apiErr) {
        const msg = apiErr?.message || "";
        if (/exist|taken|duplicate|already/i.test(msg)) {
          throw new Error("An account with that email already exists.");
        }
      }
      if (token) setToken(token);
      setSession({
        user_id: String(user_id),
        role,
        landlord_id: landlord_id == null ? null : String(landlord_id),
        name: fullName.trim(),
        email: email.trim()
      });
      setSuccess("Account created. Redirecting…");
      toast.success(`Welcome, ${fullName.split(" ")[0]}!`);
      setTimeout(() => navigate({
        to: ROLE_HOME[role]
      }), 600);
    } catch (err) {
      setError(err.message || "Registration failed");
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-semibold leading-tight", children: "Get started in minutes." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/80", children: "Create your Zenvik account and bring properties, tenants and payments into one modern workspace." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm text-primary-foreground/80 pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Multi-tenant by design" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Built-in payments & invoicing" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Role-based dashboards" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-primary-foreground/60", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Zenvik Technologies"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-md p-8 shadow-[var(--shadow-card)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold tracking-tight", children: "Create your account" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "It only takes a minute." })
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { variant: "destructive", className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: error })
      ] }),
      success && /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { className: "mb-4 border-primary/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: success })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "fullName", children: "Full name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "fullName", value: fullName, onChange: (e) => setFullName(e.target.value), placeholder: "Jane Doe", autoComplete: "name", required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "you@company.com", autoComplete: "email", required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phone", children: "Phone number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "phone", type: "tel", value: phone, onChange: (e) => setPhone(e.target.value), placeholder: "+1 555 123 4567", autoComplete: "tel", required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", children: "Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "••••••••", autoComplete: "new-password", required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "confirm", children: "Confirm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "confirm", type: "password", value: confirm, onChange: (e) => setConfirm(e.target.value), placeholder: "••••••••", autoComplete: "new-password", required: true })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "I am a" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: ROLES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setRole(r), className: `text-sm px-3 py-2 rounded-md border transition-colors ${role === r ? "bg-primary text-primary-foreground border-primary" : "bg-secondary border-transparent hover:border-border"}`, children: ROLE_LABEL[r] }, r)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", className: "w-full", disabled: loading, children: [
          loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
          loading ? "Creating account…" : "Create account"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground text-center mt-6", children: [
        "Already have an account?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "text-primary font-medium hover:underline", children: "Sign in" })
      ] })
    ] }) })
  ] });
}
export {
  RegisterPage as component
};
