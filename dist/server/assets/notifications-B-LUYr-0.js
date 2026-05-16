import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-_ixL3x3g.js";
import { A as AppLayout, B as Bell, c as Circle } from "./AppLayout--GaIKNag.js";
import { c as createLucideIcon, u as useStore, B as Button, C as Card, S as StatusBadge } from "./router-DMGhHKXf.js";
import { u as useApiList, E as ENDPOINTS } from "./apiClient-BKY6RsTL.js";
import { L as LoadingState, E as ErrorState } from "./DataStates-VT2v4C78.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./api-ySu1tSp5.js";
import "./loader-circle-CfSvM4e-.js";
const __iconNode = [
  ["path", { d: "M18 6 7 17l-5-5", key: "116fxf" }],
  ["path", { d: "m22 10-7.5 7.5L13 16", key: "ke71qq" }]
];
const CheckCheck = createLucideIcon("check-check", __iconNode);
function NotificationsPage() {
  const {
    data,
    markRead,
    markAllRead
  } = useStore();
  const remote = useApiList(ENDPOINTS.notifications);
  const [filter, setFilter] = reactExports.useState("all");
  const remoteList = (remote.data ?? []).map((n, i) => ({
    id: String(n.id ?? `r${i}`),
    title: n.title ?? n.subject ?? "Notification",
    body: n.body ?? n.message ?? "",
    date: n.date ?? n.created_at ?? "",
    status: (n.status ?? (n.is_read ? "read" : "unread")).toLowerCase()
  }));
  const list = remote.data && remote.data.length > 0 ? remoteList : data.notifications;
  const rows = list.filter((n) => filter === "all" || n.status === filter);
  const unreadCount = list.filter((n) => n.status === "unread").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-semibold tracking-tight", children: "Notifications" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-1", children: [
          unreadCount,
          " unread of ",
          data.notifications.length
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: markAllRead, disabled: unreadCount === 0, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCheck, { className: "h-4 w-4 mr-2" }),
        " Mark all as read"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: ["all", "unread", "read"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setFilter(s), className: `text-xs px-3 py-1.5 rounded-md capitalize ${filter === s ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`, children: s }, s)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-[var(--shadow-card)] divide-y divide-border", children: [
      remote.loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingState, { label: "Loading notifications…" }),
      remote.error && !remote.loading && /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, { message: remote.error, onRetry: remote.reload }),
      !remote.loading && !remote.error && rows.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-12 text-center text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-6 w-6 mx-auto mb-2 opacity-50" }),
        "No notifications."
      ] }),
      rows.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-4 flex items-start gap-4 ${n.status === "unread" ? "bg-primary/[0.03]" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1", children: n.status === "unread" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-2.5 w-2.5 fill-primary text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-2.5 w-2.5 text-muted-foreground/30" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-medium", children: n.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: n.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: n.body }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: n.date }),
            n.status === "unread" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => markRead(n.id), className: "text-xs text-primary hover:underline", children: "Mark as read" })
          ] })
        ] })
      ] }, n.id))
    ] })
  ] }) });
}
export {
  NotificationsPage as component
};
