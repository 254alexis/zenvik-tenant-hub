import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AdminChartCard } from "@/components/admin/AdminChartCard";
import {
  Building2,
  Users,
  ShieldCheck,
  Activity,
  ArrowUpRight,
  DollarSign,
  Home,
  TrendingUp,
  Server,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export const Route = createFileRoute("/admin/")({
  component: AdminOverview,
});

const REVENUE = [
  { month: "Jan", mrr: 18400, new: 2200 },
  { month: "Feb", mrr: 20100, new: 2600 },
  { month: "Mar", mrr: 22850, new: 2400 },
  { month: "Apr", mrr: 25600, new: 3100 },
  { month: "May", mrr: 28900, new: 3700 },
  { month: "Jun", mrr: 32400, new: 4100 },
  { month: "Jul", mrr: 35800, new: 3900 },
  { month: "Aug", mrr: 39600, new: 4500 },
];

const GROWTH = [
  { month: "Mar", landlords: 84, tenants: 1240 },
  { month: "Apr", landlords: 92, tenants: 1410 },
  { month: "May", landlords: 101, tenants: 1580 },
  { month: "Jun", landlords: 108, tenants: 1720 },
  { month: "Jul", landlords: 113, tenants: 1865 },
  { month: "Aug", landlords: 118, tenants: 2014 },
];

const PLAN_MIX = [
  { name: "Starter", value: 48 },
  { name: "Growth", value: 41 },
  { name: "Scale", value: 22 },
  { name: "Enterprise", value: 7 },
];

const PIE_COLORS = [
  "oklch(0.55 0.18 260)",
  "oklch(0.68 0.17 200)",
  "oklch(0.7 0.16 160)",
  "oklch(0.78 0.16 75)",
];

const workspaces = [
  { name: "Riverside Holdings", plan: "Scale", landlords: 4, properties: 18, status: "Active" },
  { name: "Northgate Estates", plan: "Growth", landlords: 2, properties: 11, status: "Active" },
  { name: "Hillside Realty", plan: "Starter", landlords: 1, properties: 6, status: "Trial" },
  { name: "Eastview Group", plan: "Growth", landlords: 3, properties: 14, status: "Active" },
  { name: "Summit Residential", plan: "Enterprise", landlords: 8, properties: 42, status: "Active" },
];

function AdminOverview() {
  return (
    <AppLayout allow={["super_admin"]}>
      <div className="space-y-8 max-w-7xl">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Platform overview</h1>
            <p className="text-muted-foreground mt-1">
              Global analytics across all workspaces.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[oklch(0.7_0.16_160)]" />
              All systems normal
            </Badge>
            <Button asChild size="sm">
              <Link to="/admin/reports">View revenue</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Workspaces" value="42" delta="+3 this month" icon={ShieldCheck} tone="success" />
          <StatCard label="Total landlords" value="118" delta="+9 this month" icon={Users} tone="success" />
          <StatCard label="Total tenants" value="2,014" delta="+149 this month" icon={Home} tone="success" />
          <StatCard label="Total properties" value="612" delta="Across 42 workspaces" icon={Building2} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="MRR" value="$39.6k" delta="+9.5% vs last month" icon={DollarSign} tone="success" />
          <StatCard label="ARR" value="$475k" delta="Annualized" icon={TrendingUp} tone="success" />
          <StatCard label="Net new revenue" value="$4.5k" delta="August" icon={ArrowUpRight} tone="success" />
          <StatCard label="API uptime" value="99.98%" delta="Last 30 days" icon={Activity} tone="success" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AdminChartCard
            title="Platform revenue"
            subtitle="MRR and net new revenue"
            className="lg:col-span-2"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE}>
                <defs>
                  <linearGradient id="mrr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.55 0.18 260)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="oklch(0.55 0.18 260)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0 0)" />
                <XAxis dataKey="month" stroke="oklch(0.55 0 0)" fontSize={12} />
                <YAxis stroke="oklch(0.55 0 0)" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid oklch(0.9 0 0)", fontSize: 12 }} />
                <Area type="monotone" dataKey="mrr" stroke="oklch(0.55 0.18 260)" fill="url(#mrr)" strokeWidth={2} />
                <Line type="monotone" dataKey="new" stroke="oklch(0.7 0.16 160)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </AdminChartCard>

          <AdminChartCard title="Plan mix" subtitle="Subscriptions by tier">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={PLAN_MIX} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={2}>
                  {PLAN_MIX.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid oklch(0.9 0 0)", fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </AdminChartCard>

          <AdminChartCard
            title="Landlord & tenant growth"
            subtitle="Cumulative counts across the platform"
            className="lg:col-span-3"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={GROWTH}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0 0)" />
                <XAxis dataKey="month" stroke="oklch(0.55 0 0)" fontSize={12} />
                <YAxis stroke="oklch(0.55 0 0)" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid oklch(0.9 0 0)", fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="landlords" stroke="oklch(0.55 0.18 260)" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="tenants" stroke="oklch(0.68 0.17 200)" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </AdminChartCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 shadow-[var(--shadow-card)] lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold">Recent workspaces</h3>
                <p className="text-sm text-muted-foreground">Tenant organizations on the platform</p>
              </div>
              <Link to="/admin/landlords" className="text-sm text-primary inline-flex items-center gap-1 hover:underline">
                Manage <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="divide-y divide-border">
              {workspaces.map((t) => (
                <div key={t.name} className="flex items-center justify-between py-3">
                  <div>
                    <div className="text-sm font-medium">{t.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.landlords} landlords · {t.properties} properties · {t.plan}
                    </div>
                  </div>
                  <Badge variant={t.status === "Trial" ? "outline" : "secondary"}>{t.status}</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold">System health</h3>
                <p className="text-sm text-muted-foreground">Live infrastructure</p>
              </div>
              <Server className="h-4 w-4 text-muted-foreground" />
            </div>
            <ul className="space-y-3 text-sm">
              {[
                { label: "API", status: "Operational", ok: true, meta: "120ms p95" },
                { label: "Database", status: "Operational", ok: true, meta: "98% cache hit" },
                { label: "Background jobs", status: "Degraded", ok: false, meta: "Queue +18s" },
                { label: "Email delivery", status: "Operational", ok: true, meta: "99.4%" },
                { label: "File storage", status: "Operational", ok: true, meta: "S3 us-east" },
              ].map((s) => (
                <li key={s.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {s.ok ? (
                      <CheckCircle2 className="h-4 w-4 text-[oklch(0.55_0.16_160)]" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-[oklch(0.65_0.16_75)]" />
                    )}
                    <span>{s.label}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{s.meta}</div>
                </li>
              ))}
            </ul>
            <Button asChild variant="outline" size="sm" className="w-full mt-5">
              <Link to="/admin/monitoring">Open monitoring</Link>
            </Button>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
