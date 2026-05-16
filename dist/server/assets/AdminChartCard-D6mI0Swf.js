import { U as jsxRuntimeExports } from "./worker-entry-_ixL3x3g.js";
import { C as Card } from "./router-DMGhHKXf.js";
function AdminChartCard({
  title,
  subtitle,
  action,
  children,
  className,
  height = "h-72"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: `p-6 shadow-[var(--shadow-card)] border-border/60 ${className ?? ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: title }),
        subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: subtitle })
      ] }),
      action
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: height, children })
  ] });
}
export {
  AdminChartCard as A
};
