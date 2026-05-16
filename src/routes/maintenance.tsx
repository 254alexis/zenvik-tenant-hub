import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { DataTable } from "@/components/DataTable";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { FormModal } from "@/components/FormModal";
import { useStore, type MaintPriority, type MaintStatus, type MaintenanceRequest } from "@/lib/store";
import { Wrench, Plus, AlertTriangle, CheckCircle2, Clock, UserCog } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/maintenance")({
  component: MaintenancePage,
});

const PRIORITY_TONE: Record<MaintPriority, string> = {
  low: "bg-secondary text-muted-foreground",
  medium: "bg-[oklch(0.93_0.07_220)] text-[oklch(0.38_0.15_220)]",
  high: "bg-[oklch(0.95_0.08_75)] text-[oklch(0.4_0.13_75)]",
  urgent: "bg-[oklch(0.93_0.09_25)] text-[oklch(0.4_0.18_25)]",
};

const STATUS_TONE: Record<MaintStatus, string> = {
  open: "bg-[oklch(0.93_0.09_25)] text-[oklch(0.4_0.18_25)]",
  assigned: "bg-[oklch(0.93_0.07_220)] text-[oklch(0.38_0.15_220)]",
  in_progress: "bg-[oklch(0.95_0.08_75)] text-[oklch(0.4_0.13_75)]",
  resolved: "bg-[oklch(0.94_0.07_160)] text-[oklch(0.35_0.12_160)]",
  closed: "bg-secondary text-muted-foreground",
};

const STAFF = ["James Carter", "Priya Patel", "Marco Silva", "Anita Rao"];
const CATEGORIES = ["Plumbing", "Electrical", "HVAC", "General", "Appliance", "Pest control"];

export function PriorityBadge({ p }: { p: MaintPriority }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium capitalize ${PRIORITY_TONE[p]}`}
    >
      {p === "urgent" && <AlertTriangle className="h-3 w-3 mr-1" />}
      {p}
    </span>
  );
}

export function StatusBadge({ s }: { s: MaintStatus }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium capitalize ${STATUS_TONE[s]}`}
    >
      {s.replace("_", " ")}
    </span>
  );
}

function MaintenancePage() {
  return (
    <AppLayout allow={["super_admin", "landlord", "staff"]}>
      <MaintenanceView />
    </AppLayout>
  );
}

export function MaintenanceView({ tenantOnly }: { tenantOnly?: string } = {}) {
  const { data, addMaintenance, updateMaintenance } = useStore();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<MaintenanceRequest | null>(null);

  const rows = useMemo(
    () => (tenantOnly ? data.maintenance.filter((m) => m.tenant_id === tenantOnly) : data.maintenance),
    [data.maintenance, tenantOnly],
  );

  const stats = useMemo(() => {
    const s = { open: 0, in_progress: 0, resolved: 0, urgent: 0 };
    rows.forEach((r) => {
      if (r.status === "open" || r.status === "assigned") s.open++;
      if (r.status === "in_progress") s.in_progress++;
      if (r.status === "resolved" || r.status === "closed") s.resolved++;
      if (r.priority === "urgent" && r.status !== "resolved" && r.status !== "closed") s.urgent++;
    });
    return s;
  }, [rows]);

  const propertyName = (id: string) => data.properties.find((p) => p.id === id)?.name ?? "—";
  const unitLabel = (id: string | null) => data.units.find((u) => u.id === id)?.label ?? "—";
  const tenantName = (id: string | null) => data.tenants.find((t) => t.id === id)?.name ?? "—";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const fd = new FormData(e.currentTarget);
    const property_id = (fd.get("property_id") as string) || data.properties[0]?.id;
    addMaintenance({
      title: fd.get("title") as string,
      description: (fd.get("description") as string) || "",
      property_id,
      unit_id: (fd.get("unit_id") as string) || null,
      tenant_id: tenantOnly ?? null,
      category: (fd.get("category") as string) || "General",
      priority: (fd.get("priority") as MaintPriority) || "medium",
    });
    toast.success("Request submitted");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Maintenance</h1>
          <p className="text-muted-foreground mt-1">
            Track requests from open to resolved with staff assignments.
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4 mr-2" /> New request
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KPI label="Open" value={stats.open} icon={Clock} tone="warning" />
        <KPI label="In progress" value={stats.in_progress} icon={Wrench} tone="info" />
        <KPI label="Resolved" value={stats.resolved} icon={CheckCircle2} tone="success" />
        <KPI label="Urgent" value={stats.urgent} icon={AlertTriangle} tone="danger" />
      </div>

      <DataTable
        rows={rows}
        searchKeys={["title", "category", "assigned_to"]}
        searchPlaceholder="Search requests…"
        filters={[
          {
            key: "status",
            label: "Status",
            options: [
              { value: "open", label: "Open" },
              { value: "assigned", label: "Assigned" },
              { value: "in_progress", label: "In progress" },
              { value: "resolved", label: "Resolved" },
              { value: "closed", label: "Closed" },
            ],
          },
          {
            key: "priority",
            label: "Priority",
            options: [
              { value: "low", label: "Low" },
              { value: "medium", label: "Medium" },
              { value: "high", label: "High" },
              { value: "urgent", label: "Urgent" },
            ],
          },
        ]}
        onRowClick={(r) => setActive(r)}
        empty="No maintenance requests."
        columns={[
          {
            key: "title",
            label: "Request",
            render: (r) => (
              <div>
                <div className="font-medium">{r.title}</div>
                <div className="text-xs text-muted-foreground">
                  {r.category} · {propertyName(r.property_id)} {r.unit_id ? `· ${unitLabel(r.unit_id)}` : ""}
                </div>
              </div>
            ),
          },
          { key: "priority", label: "Priority", render: (r) => <PriorityBadge p={r.priority} /> },
          { key: "status", label: "Status", render: (r) => <StatusBadge s={r.status} /> },
          {
            key: "assigned_to",
            label: "Assigned",
            hideOnMobile: true,
            render: (r) =>
              r.assigned_to ? (
                <span className="text-sm">{r.assigned_to}</span>
              ) : (
                <span className="text-xs text-muted-foreground italic">Unassigned</span>
              ),
          },
          { key: "created_at", label: "Created", hideOnMobile: true },
        ]}
      />

      <FormModal
        open={open}
        onOpenChange={setOpen}
        title="New maintenance request"
        submitLabel="Submit request"
        onSubmit={handleSubmit}
      >
        <div className="space-y-1.5">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" required placeholder="e.g. Leaking sink" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              name="category"
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="priority">Priority</Label>
            <select
              id="priority"
              name="priority"
              defaultValue="medium"
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>
        {!tenantOnly && (
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="property_id">Property</Label>
              <select
                id="property_id"
                name="property_id"
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                {data.properties.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="unit_id">Unit (optional)</Label>
              <select
                id="unit_id"
                name="unit_id"
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="">—</option>
                {data.units.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        <div className="space-y-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" rows={3} placeholder="Describe the issue…" />
        </div>
      </FormModal>

      <Sheet open={!!active} onOpenChange={(v) => !v && setActive(null)}>
        <SheetContent className="sm:max-w-lg overflow-y-auto">
          {active && (
            <>
              <SheetHeader>
                <SheetTitle>{active.title}</SheetTitle>
                <SheetDescription>
                  {propertyName(active.property_id)} · {unitLabel(active.unit_id)}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <PriorityBadge p={active.priority} />
                  <StatusBadge s={active.status} />
                  <span className="text-xs text-muted-foreground">{active.category}</span>
                </div>

                <Card className="p-4 text-sm leading-relaxed">{active.description}</Card>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <Field label="Tenant" value={tenantName(active.tenant_id)} />
                  <Field label="Created" value={active.created_at} />
                  <Field label="Last update" value={active.updated_at} />
                  <Field label="Assigned to" value={active.assigned_to ?? "Unassigned"} />
                </div>

                {!tenantOnly && (
                  <Card className="p-4 space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <UserCog className="h-4 w-4" /> Update workflow
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label className="text-xs">Status</Label>
                        <select
                          value={active.status}
                          onChange={(e) => {
                            updateMaintenance(active.id, { status: e.target.value as MaintStatus });
                            setActive({ ...active, status: e.target.value as MaintStatus });
                            toast.success("Status updated");
                          }}
                          className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                        >
                          <option value="open">Open</option>
                          <option value="assigned">Assigned</option>
                          <option value="in_progress">In progress</option>
                          <option value="resolved">Resolved</option>
                          <option value="closed">Closed</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs">Assign staff</Label>
                        <select
                          value={active.assigned_to ?? ""}
                          onChange={(e) => {
                            const v = e.target.value || null;
                            updateMaintenance(active.id, {
                              assigned_to: v,
                              status: v && active.status === "open" ? "assigned" : active.status,
                            });
                            setActive({
                              ...active,
                              assigned_to: v,
                              status: v && active.status === "open" ? "assigned" : active.status,
                            });
                            toast.success(v ? `Assigned to ${v}` : "Unassigned");
                          }}
                          className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                        >
                          <option value="">Unassigned</option>
                          {STAFF.map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-medium mt-0.5">{value}</div>
    </div>
  );
}

function KPI({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  tone: "success" | "warning" | "danger" | "info";
}) {
  const toneCls = {
    success: "bg-[oklch(0.94_0.07_160)] text-[oklch(0.35_0.12_160)]",
    warning: "bg-[oklch(0.95_0.08_75)] text-[oklch(0.4_0.13_75)]",
    danger: "bg-[oklch(0.93_0.09_25)] text-[oklch(0.4_0.18_25)]",
    info: "bg-primary/10 text-primary",
  }[tone];
  return (
    <Card className="p-4 flex items-center gap-3">
      <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${toneCls}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-2xl font-semibold">{value}</div>
      </div>
    </Card>
  );
}
