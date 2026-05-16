import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { StatCard } from "@/components/StatCard";
import { AdminChartCard } from "@/components/admin/AdminChartCard";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { DollarSign, TrendingUp, TrendingDown, Wallet } from "lucide-react";

export const Route = createFileRoute("/admin/reports")({
  component: AdminReports,
});

const MRR = [
  { month: "Jan", mrr: 18400, churn: 420 },
  { month: "Feb", mrr: 20100, churn: 510 },
  { month: "Mar", mrr: 22850, churn: 380 },
  { month: "Apr", mrr: 25600, churn: 610 },
  { month: "May", mrr: 28900, churn: 540 },
  { month: "Jun", mrr: 32400, churn: 720 },
  { month: "Jul", mrr: 35800, churn: 690 },
  { month: "Aug", mrr: 39600, churn: 810 },
];

const PLAN_REV = [
  { plan: "Starter", revenue: 4800 },
  { plan: "Growth", revenue: 14600 },
  { plan: "Scale", revenue: 12200 },
  { plan: "Enterprise", revenue: 8000 },
];

const CHANNELS = [
  { month: "Mar", direct: 7200, partner: 4100, referral: 2300 },
  { month: "Apr", direct: 8400, partner: 5200, referral: 2700 },
  { month: "May", direct: 9800, partner: 5900, referral: 3100 },
  { month: "Jun", direct: 11200, partner: 7100, referral: 3600 },
  { month: "Jul", direct: 12800, partner: 7800, referral: 4100 },
  { month: "Aug", direct: 14600, partner: 9400, referral: 4800 },
];

function AdminReports() {
  return (
    <AppLayout allow={["super_admin"]}>
      <div className="space-y-8 max-w-7xl">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Revenue analytics</h1>
          <p className="text-muted-foreground mt-1">
            Platform revenue, growth, and retention.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="MRR" value="$39.6k" delta="+9.5% MoM" icon={DollarSign} tone="success" />
          <StatCard label="ARR" value="$475k" delta="Annualized" icon={TrendingUp} tone="success" />
          <StatCard label="ARPU" value="$335" delta="+$12 vs last month" icon={Wallet} tone="success" />
          <StatCard label="Churn" value="2.1%" delta="Net revenue churn" icon={TrendingDown} tone="warning" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AdminChartCard
            title="Monthly recurring revenue"
            subtitle="MRR over the last 8 months"
            className="lg:col-span-2"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MRR}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.55 0.18 260)" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="oklch(0.55 0.18 260)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0 0)" />
                <XAxis dataKey="month" stroke="oklch(0.55 0 0)" fontSize={12} />
                <YAxis stroke="oklch(0.55 0 0)" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid oklch(0.9 0 0)", fontSize: 12 }} />
                <Area type="monotone" dataKey="mrr" stroke="oklch(0.55 0.18 260)" fill="url(#rev)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </AdminChartCard>

          <AdminChartCard title="Revenue by plan" subtitle="Monthly contribution">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PLAN_REV} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0 0)" />
                <XAxis type="number" stroke="oklch(0.55 0 0)" fontSize={12} />
                <YAxis type="category" dataKey="plan" stroke="oklch(0.55 0 0)" fontSize={12} width={80} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid oklch(0.9 0 0)", fontSize: 12 }} />
                <Bar dataKey="revenue" fill="oklch(0.55 0.18 260)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </AdminChartCard>

          <AdminChartCard
            title="Revenue by channel"
            subtitle="Direct, partner and referral revenue"
            className="lg:col-span-2"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHANNELS}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0 0)" />
                <XAxis dataKey="month" stroke="oklch(0.55 0 0)" fontSize={12} />
                <YAxis stroke="oklch(0.55 0 0)" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid oklch(0.9 0 0)", fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="direct" stackId="a" fill="oklch(0.55 0.18 260)" />
                <Bar dataKey="partner" stackId="a" fill="oklch(0.68 0.17 200)" />
                <Bar dataKey="referral" stackId="a" fill="oklch(0.78 0.16 75)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </AdminChartCard>

          <AdminChartCard title="Churn trend" subtitle="Lost revenue per month">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MRR}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0 0)" />
                <XAxis dataKey="month" stroke="oklch(0.55 0 0)" fontSize={12} />
                <YAxis stroke="oklch(0.55 0 0)" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid oklch(0.9 0 0)", fontSize: 12 }} />
                <Line type="monotone" dataKey="churn" stroke="oklch(0.65 0.18 30)" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </AdminChartCard>
        </div>
      </div>
    </AppLayout>
  );
}
