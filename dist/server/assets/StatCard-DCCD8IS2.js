import { U as jsxRuntimeExports } from "./worker-entry-_ixL3x3g.js";
import { C as Card } from "./router-DMGhHKXf.js";
function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  tone = "default"
}) {
  const toneClass = tone === "success" ? "text-[oklch(0.55_0.16_160)]" : tone === "warning" ? "text-[oklch(0.65_0.16_75)]" : "text-muted-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-6 shadow-[var(--shadow-card)] border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-3xl font-semibold tracking-tight", children: value }),
      delta && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-1 text-xs ${toneClass}`, children: delta })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-lg bg-secondary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 text-primary" }) })
  ] }) });
}
export {
  StatCard as S
};
