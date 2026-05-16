import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/StatCard";
import { DataTable, type Column } from "@/components/DataTable";
import { Users, UserCheck, UserX, Home } from "lucide-react";

export const Route = createFileRoute("/admin/users")({
  component: AdminUsers,
});

type Tenant = {
  id: string;
  name: string;
  email: string;
  workspace: string;
  property: string;
  unit: string;
  status: "Active" | "Pending" | "Moved out";
};

const ROWS: Tenant[] = [
  { id: "T-9001", name: "Mark Wanyama", email: "mark.w@mail.com", workspace: "Riverside Holdings", property: "Riverside Towers", unit: "A-204", status: "Active" },
  { id: "T-9002", name: "Grace Atieno", email: "grace.a@mail.com", workspace: "Northgate Estates", property: "Northgate Plaza", unit: "B-110", status: "Active" },
  { id: "T-9003", name: "Eric Mutua", email: "eric.m@mail.com", workspace: "Hillside Realty", property: "Hillside Court", unit: "C-3", status: "Pending" },
  { id: "T-9004", name: "Naomi Wairimu", email: "naomi.w@mail.com", workspace: "Eastview Group", property: "Eastview Heights", unit: "D-501", status: "Active" },
  { id: "T-9005", name: "Brian Ouma", email: "brian.o@mail.com", workspace: "Summit Residential", property: "Summit Business Park", unit: "E-12", status: "Moved out" },
  { id: "T-9006", name: "Lucy Njeri", email: "lucy.n@mail.com", workspace: "Laketown Realty", property: "Laketown Villas", unit: "F-7", status: "Active" },
];

const statusVariant = (s: Tenant["status"]) =>
  s === "Active" ? "secondary" : s === "Pending" ? "outline" : "destructive";

function AdminUsers() {
  const active = ROWS.filter((r) => r.status === "Active").length;
  const pending = ROWS.filter((r) => r.status === "Pending").length;
  const moved = ROWS.filter((r) => r.status === "Moved out").length;

  const columns: Column<Tenant>[] = [
    {
      key: "name",
      label: "Tenant",
      render: (r) => (
        <div>
          <div className="text-sm font-medium">{r.name}</div>
          <div className="text-xs text-muted-foreground">{r.email}</div>
        </div>
      ),
    },
    { key: "workspace", label: "Workspace" },
    {
      key: "property",
      label: "Property",
      render: (r) => (
        <div>
          <div className="text-sm">{r.property}</div>
          <div className="text-xs text-muted-foreground">Unit {r.unit}</div>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (r) => <Badge variant={statusVariant(r.status)}>{r.status}</Badge>,
    },
  ];

  return (
    <AppLayout allow={["super_admin"]}>
      <div className="space-y-8 max-w-7xl">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Tenants</h1>
          <p className="text-muted-foreground mt-1">
            All tenants across every workspace on the platform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total tenants" value={String(ROWS.length)} icon={Users} />
          <StatCard label="Active" value={String(active)} icon={UserCheck} tone="success" />
          <StatCard label="Pending" value={String(pending)} icon={Home} />
          <StatCard label="Moved out" value={String(moved)} icon={UserX} tone="warning" />
        </div>

        <Card className="p-4 sm:p-6 shadow-[var(--shadow-card)]">
          <DataTable
            rows={ROWS}
            columns={columns}
            searchKeys={["name", "email", "workspace", "property", "unit"]}
            searchPlaceholder="Search tenants…"
            filters={[
              {
                key: "status",
                label: "Status",
                options: [
                  { value: "Active", label: "Active" },
                  { value: "Pending", label: "Pending" },
                  { value: "Moved out", label: "Moved out" },
                ],
              },
            ]}
          />
        </Card>
      </div>
    </AppLayout>
  );
}
