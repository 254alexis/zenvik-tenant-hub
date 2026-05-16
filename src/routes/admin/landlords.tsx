import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/StatCard";
import { DataTable, type Column } from "@/components/DataTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShieldCheck, Users, Building2, MoreHorizontal, UserPlus, Ban, KeyRound, Eye } from "lucide-react";

export const Route = createFileRoute("/admin/landlords")({
  component: AdminLandlords,
});

type Landlord = {
  id: string;
  name: string;
  email: string;
  workspace: string;
  plan: "Starter" | "Growth" | "Scale" | "Enterprise";
  properties: number;
  tenants: number;
  status: "Active" | "Trial" | "Suspended";
  joined: string;
};

const ROWS: Landlord[] = [
  { id: "L-1042", name: "Aisha Mwangi", email: "aisha@riverside.co", workspace: "Riverside Holdings", plan: "Scale", properties: 18, tenants: 84, status: "Active", joined: "2024-11-02" },
  { id: "L-1043", name: "David Otieno", email: "david@northgate.io", workspace: "Northgate Estates", plan: "Growth", properties: 11, tenants: 52, status: "Active", joined: "2025-01-14" },
  { id: "L-1044", name: "Priya Shah", email: "priya@hillside.com", workspace: "Hillside Realty", plan: "Starter", properties: 6, tenants: 21, status: "Trial", joined: "2026-04-21" },
  { id: "L-1045", name: "James Kariuki", email: "james@eastview.co", workspace: "Eastview Group", plan: "Growth", properties: 14, tenants: 68, status: "Active", joined: "2025-03-11" },
  { id: "L-1046", name: "Lina Park", email: "lina@summit.co", workspace: "Summit Residential", plan: "Enterprise", properties: 42, tenants: 211, status: "Active", joined: "2024-08-19" },
  { id: "L-1047", name: "Tom Becker", email: "tom@meadowlane.io", workspace: "Meadowlane Group", plan: "Starter", properties: 4, tenants: 14, status: "Suspended", joined: "2025-09-04" },
  { id: "L-1048", name: "Sara Ali", email: "sara@laketown.co", workspace: "Laketown Realty", plan: "Growth", properties: 9, tenants: 41, status: "Active", joined: "2025-12-02" },
];

const statusVariant = (s: Landlord["status"]) =>
  s === "Active" ? "secondary" : s === "Trial" ? "outline" : "destructive";

function AdminLandlords() {
  const [rows, setRows] = useState<Landlord[]>(ROWS);

  const toggleSuspend = (id: string) =>
    setRows((rs) =>
      rs.map((r) =>
        r.id === id
          ? { ...r, status: r.status === "Suspended" ? "Active" : "Suspended" }
          : r,
      ),
    );

  const columns: Column<Landlord>[] = [
    {
      key: "name",
      label: "Landlord",
      render: (r) => (
        <div>
          <div className="text-sm font-medium">{r.name}</div>
          <div className="text-xs text-muted-foreground">{r.email}</div>
        </div>
      ),
    },
    { key: "workspace", label: "Workspace" },
    {
      key: "plan",
      label: "Plan",
      render: (r) => <Badge variant="outline">{r.plan}</Badge>,
    },
    { key: "properties", label: "Properties", className: "text-right" },
    { key: "tenants", label: "Tenants", className: "text-right" },
    {
      key: "status",
      label: "Status",
      render: (r) => <Badge variant={statusVariant(r.status)}>{r.status}</Badge>,
    },
    { key: "joined", label: "Joined", hideOnMobile: true },
    {
      key: "actions",
      label: "",
      render: (r) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="h-4 w-4" /> View workspace
            </DropdownMenuItem>
            <DropdownMenuItem>
              <KeyRound className="h-4 w-4" /> Reset password
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => toggleSuspend(r.id)}
            >
              <Ban className="h-4 w-4" />
              {r.status === "Suspended" ? "Reactivate" : "Suspend"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      className: "w-12",
    },
  ];

  const active = rows.filter((r) => r.status === "Active").length;
  const trial = rows.filter((r) => r.status === "Trial").length;
  const suspended = rows.filter((r) => r.status === "Suspended").length;

  return (
    <AppLayout allow={["super_admin"]}>
      <div className="space-y-8 max-w-7xl">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Landlord accounts</h1>
            <p className="text-muted-foreground mt-1">
              Manage workspaces, plans, and access for landlords.
            </p>
          </div>
          <Button>
            <UserPlus className="h-4 w-4" /> Invite landlord
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total landlords" value={String(rows.length)} icon={ShieldCheck} />
          <StatCard label="Active" value={String(active)} icon={Users} tone="success" />
          <StatCard label="On trial" value={String(trial)} icon={Building2} />
          <StatCard label="Suspended" value={String(suspended)} icon={Ban} tone="warning" />
        </div>

        <Card className="p-4 sm:p-6 shadow-[var(--shadow-card)]">
          <DataTable
            rows={rows}
            columns={columns}
            searchKeys={["name", "email", "workspace", "id"]}
            searchPlaceholder="Search landlords, workspaces…"
            filters={[
              {
                key: "plan",
                label: "Plan",
                options: [
                  { value: "Starter", label: "Starter" },
                  { value: "Growth", label: "Growth" },
                  { value: "Scale", label: "Scale" },
                  { value: "Enterprise", label: "Enterprise" },
                ],
              },
              {
                key: "status",
                label: "Status",
                options: [
                  { value: "Active", label: "Active" },
                  { value: "Trial", label: "Trial" },
                  { value: "Suspended", label: "Suspended" },
                ],
              },
            ]}
          />
        </Card>
      </div>
    </AppLayout>
  );
}
