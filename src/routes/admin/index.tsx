import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, ShieldCheck, Activity, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminOverview,
});

const tenants = [
  { name: "Riverside Holdings", landlords: 4, properties: 18, status: "Active" },
  { name: "Northgate Estates", landlords: 2, properties: 11, status: "Active" },
  { name: "Hillside Realty", landlords: 1, properties: 6, status: "Trial" },
  { name: "Eastview Group", landlords: 3, properties: 14, status: "Active" },
];

function AdminOverview() {
  return (
    <AppLayout allow={["super_admin"]}>
      <div className="space-y-8 max-w-7xl">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">System overview</h1>
          <p className="text-muted-foreground mt-1">Platform-wide health and usage.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Workspaces" value="42" delta="+3 this month" icon={ShieldCheck} tone="success" />
          <StatCard label="Landlords" value="118" delta="+9 this month" icon={Users} tone="success" />
          <StatCard label="Properties" value="612" delta="Across 42 tenants" icon={Building2} />
          <StatCard label="API uptime" value="99.98%" delta="Last 30 days" icon={Activity} tone="success" />
        </div>

        <Card className="p-6 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold">Recent workspaces</h3>
              <p className="text-sm text-muted-foreground">Tenant organizations on the platform</p>
            </div>
            <a href="#" className="text-sm text-primary inline-flex items-center gap-1 hover:underline">
              View all <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
          <div className="divide-y divide-border">
            {tenants.map((t) => (
              <div key={t.name} className="flex items-center justify-between py-3">
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.landlords} landlords · {t.properties} properties</div>
                </div>
                <Badge variant="secondary">{t.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
