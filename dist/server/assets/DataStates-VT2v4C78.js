import { U as jsxRuntimeExports } from "./worker-entry-_ixL3x3g.js";
import { a as CircleAlert, B as Button, G as RefreshCw } from "./router-DMGhHKXf.js";
import { L as LoaderCircle } from "./loader-circle-CfSvM4e-.js";
function LoadingState({ label = "Loading…" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center py-16 text-muted-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin mr-2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: label })
  ] });
}
function ErrorState({ message, onRetry }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-12 px-6 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full bg-[oklch(0.97_0.04_25)] flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-5 w-5 text-[oklch(0.55_0.2_25)]" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium text-sm", children: "Couldn't load data" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 max-w-md", children: message }),
    onRetry && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "mt-4", onClick: onRetry, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-3.5 w-3.5 mr-2" }),
      " Try again"
    ] })
  ] });
}
export {
  ErrorState as E,
  LoadingState as L
};
