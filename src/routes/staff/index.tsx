import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Wrench, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/staff/")({
  component: StaffDashboard,
});

const tasks = [
  { id: "T-204", title: "Leaking kitchen faucet", unit: "Apt 4B · Riverside", priority: "High", status: "In progress" },
  { id: "T-203", title: "Broken thermostat", unit: "Apt 12 · Northgate", priority: "Medium", status: "Open" },
  { id: "T-201", title: "Repaint hallway", unit: "Common · Eastview", priority: "Low", status: "Open" },
  { id: "T-198", title: "Replace smoke detector", unit: "Apt 7A · Eastview", priority: "High", status: "Open" },
];

const priorityClass = (p: string) =>
  p === "High"
    ? "bg-[oklch(0.93_0.09_25)] text-[oklch(0.4_0.18_25)]"
    : p === "Medium"
      ? "bg-[oklch(0.95_0.08_75)] text-[oklch(0.4_0.13_75)]"
      : "bg-secondary text-muted-foreground";

function StaffDashboard() {
  return (
    <AppLayout allow={["staff"]}>
      <div className="space-y-8 max-w-5xl">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Maintenance tasks</h1>
          <p className="text-muted-foreground mt-1">Your assigned work orders.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Open" value="6" icon={Wrench} />
          <StatCard label="In progress" value="2" icon={Clock} tone="warning" />
          <StatCard label="Closed this week" value="9" icon={CheckCircle2} tone="success" />
        </div>

        <Card className="p-6 shadow-[var(--shadow-card)]">
          <div className="mb-6">
            <h3 className="font-semibold">Assigned to you</h3>
            <p className="text-sm text-muted-foreground">Sorted by priority</p>
          </div>
          <div className="space-y-3">
            {tasks.map((t) => (
              <div key={t.id} className="p-4 rounded-lg border border-border flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{t.id}</span>
                    {t.priority === "High" && <AlertTriangle className="h-3 w-3 text-[oklch(0.55_0.2_25)]" />}
                  </div>
                  <div className="text-sm font-medium mt-0.5">{t.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{t.unit}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className={priorityClass(t.priority)}>{t.priority}</Badge>
                    <Badge variant="outline">{t.status}</Badge>
                  </div>
                </div>
                <Button size="sm" variant="outline">Update</Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
