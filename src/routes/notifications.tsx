import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, CheckCheck, Circle } from "lucide-react";
import { useStore } from "@/lib/store";
import { StatusBadge } from "@/components/FormModal";
import { useApiList, ENDPOINTS } from "@/lib/apiClient";
import { LoadingState, ErrorState } from "@/components/DataStates";

export const Route = createFileRoute("/notifications")({
  component: NotificationsPage,
});

function NotificationsPage() {
  const { data, markRead, markAllRead } = useStore();
  const remote = useApiList<any>(ENDPOINTS.notifications);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  const remoteList = (remote.data ?? []).map((n: any, i: number) => ({
    id: String(n.id ?? `r${i}`),
    title: n.title ?? n.subject ?? "Notification",
    body: n.body ?? n.message ?? "",
    date: n.date ?? n.created_at ?? "",
    status: ((n.status ?? (n.is_read ? "read" : "unread")) as string).toLowerCase() as "read" | "unread",
  }));
  const list = remote.data && remote.data.length > 0 ? remoteList : data.notifications;
  const rows = list.filter((n) => filter === "all" || n.status === filter);
  const unreadCount = list.filter((n) => n.status === "unread").length;

  return (
    <AppLayout>
      <div className="space-y-6 max-w-3xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Notifications</h1>
            <p className="text-muted-foreground mt-1">
              {unreadCount} unread of {data.notifications.length}
            </p>
          </div>
          <Button variant="outline" onClick={markAllRead} disabled={unreadCount === 0}>
            <CheckCheck className="h-4 w-4 mr-2" /> Mark all as read
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {(["all", "unread", "read"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`text-xs px-3 py-1.5 rounded-md capitalize ${
                filter === s ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <Card className="shadow-[var(--shadow-card)] divide-y divide-border">
          {remote.loading && <LoadingState label="Loading notifications…" />}
          {remote.error && !remote.loading && (
            <ErrorState message={remote.error} onRetry={remote.reload} />
          )}
          {!remote.loading && !remote.error && rows.length === 0 && (
            <div className="p-12 text-center text-sm text-muted-foreground">
              <Bell className="h-6 w-6 mx-auto mb-2 opacity-50" />
              No notifications.
            </div>
          )}
          {rows.map((n) => (
            <div key={n.id} className={`p-4 flex items-start gap-4 ${n.status === "unread" ? "bg-primary/[0.03]" : ""}`}>
              <div className="mt-1">
                {n.status === "unread" ? (
                  <Circle className="h-2.5 w-2.5 fill-primary text-primary" />
                ) : (
                  <Circle className="h-2.5 w-2.5 text-muted-foreground/30" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-medium">{n.title}</h4>
                  <StatusBadge status={n.status} />
                </div>
                <p className="text-sm text-muted-foreground mt-1">{n.body}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">{n.date}</span>
                  {n.status === "unread" && (
                    <button onClick={() => markRead(n.id)} className="text-xs text-primary hover:underline">
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </AppLayout>
  );
}
