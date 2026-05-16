import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/StatCard";
import { DataTable, type Column } from "@/components/DataTable";
import { Building2, Home, MapPin, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/admin/properties")({
  component: AdminProperties,
});

type Property = {
  id: string;
  name: string;
  workspace: string;
  city: string;
  units: number;
  occupancy: number;
  type: "Residential" | "Commercial" | "Mixed";
};

const ROWS: Property[] = [
  { id: "P-2001", name: "Riverside Towers", workspace: "Riverside Holdings", city: "Nairobi", units: 42, occupancy: 96, type: "Residential" },
  { id: "P-2002", name: "Northgate Plaza", workspace: "Northgate Estates", city: "Mombasa", units: 28, occupancy: 89, type: "Mixed" },
  { id: "P-2003", name: "Hillside Court", workspace: "Hillside Realty", city: "Kisumu", units: 16, occupancy: 81, type: "Residential" },
  { id: "P-2004", name: "Eastview Heights", workspace: "Eastview Group", city: "Nairobi", units: 60, occupancy: 92, type: "Residential" },
  { id: "P-2005", name: "Summit Business Park", workspace: "Summit Residential", city: "Nairobi", units: 24, occupancy: 100, type: "Commercial" },
  { id: "P-2006", name: "Laketown Villas", workspace: "Laketown Realty", city: "Naivasha", units: 18, occupancy: 78, type: "Residential" },
];

function AdminProperties() {
  const totalUnits = ROWS.reduce((a, r) => a + r.units, 0);
  const avgOcc = Math.round(ROWS.reduce((a, r) => a + r.occupancy, 0) / ROWS.length);

  const columns: Column<Property>[] = [
    {
      key: "name",
      label: "Property",
      render: (r) => (
        <div>
          <div className="text-sm font-medium">{r.name}</div>
          <div className="text-xs text-muted-foreground">{r.workspace}</div>
        </div>
      ),
    },
    { key: "city", label: "City" },
    {
      key: "type",
      label: "Type",
      render: (r) => <Badge variant="outline">{r.type}</Badge>,
    },
    { key: "units", label: "Units", className: "text-right" },
    {
      key: "occupancy",
      label: "Occupancy",
      render: (r) => (
        <div className="flex items-center gap-2 min-w-[120px]">
          <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full bg-primary"
              style={{ width: `${r.occupancy}%` }}
            />
          </div>
          <span className="text-xs tabular-nums w-9 text-right">{r.occupancy}%</span>
        </div>
      ),
    },
  ];

  return (
    <AppLayout allow={["super_admin"]}>
      <div className="space-y-8 max-w-7xl">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Properties</h1>
          <p className="text-muted-foreground mt-1">
            All properties across every workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total properties" value={String(ROWS.length)} icon={Building2} />
          <StatCard label="Total units" value={String(totalUnits)} icon={Home} />
          <StatCard label="Cities" value={String(new Set(ROWS.map((r) => r.city)).size)} icon={MapPin} />
          <StatCard label="Avg occupancy" value={`${avgOcc}%`} icon={TrendingUp} tone="success" />
        </div>

        <Card className="p-4 sm:p-6 shadow-[var(--shadow-card)]">
          <DataTable
            rows={ROWS}
            columns={columns}
            searchKeys={["name", "workspace", "city", "id"]}
            searchPlaceholder="Search properties…"
            filters={[
              {
                key: "type",
                label: "Type",
                options: [
                  { value: "Residential", label: "Residential" },
                  { value: "Commercial", label: "Commercial" },
                  { value: "Mixed", label: "Mixed" },
                ],
              },
            ]}
          />
        </Card>
      </div>
    </AppLayout>
  );
}
