import { Card } from "@/components/ui/card";
import { useApiList } from "@/lib/apiClient";
import { LoadingState, ErrorState } from "@/components/DataStates";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const FALLBACK_REVENUE = [
  { month: "Jan", income: 38200, arrears: 4200 },
  { month: "Feb", income: 41500, arrears: 3800 },
  { month: "Mar", income: 39800, arrears: 5100 },
  { month: "Apr", income: 44200, arrears: 4600 },
  { month: "May", income: 46100, arrears: 5300 },
  { month: "Jun", income: 48200, arrears: 5700 },
];

const FALLBACK_OCCUPANCY = [
  { name: "Occupied", value: 34 },
  { name: "Vacant", value: 4 },
];

const PIE_COLORS = ["oklch(0.55 0.18 250)", "oklch(0.78 0.12 75)"];

function ChartCard({
  title,
  subtitle,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={`p-6 shadow-[var(--shadow-card)] ${className ?? ""}`}>
      <div className="mb-4">
        <h3 className="font-semibold">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="h-64">{children}</div>
    </Card>
  );
}

export function DashboardCharts() {
  const revenue = useApiList<any>("/analytics/revenue.php");
  const occupancy = useApiList<any>("/analytics/occupancy.php");

  const revenueData =
    revenue.data && revenue.data.length > 0
      ? revenue.data.map((r: any) => ({
          month: r.month ?? r.label ?? "",
          income: Number(r.income ?? r.revenue ?? 0),
          arrears: Number(r.arrears ?? r.overdue ?? 0),
        }))
      : FALLBACK_REVENUE;

  const occupancyData =
    occupancy.data && occupancy.data.length > 0
      ? occupancy.data.map((o: any) => ({
          name: o.name ?? o.label ?? "",
          value: Number(o.value ?? o.count ?? 0),
        }))
      : FALLBACK_OCCUPANCY;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <ChartCard
        title="Monthly income"
        subtitle="Revenue collected per month"
        className="lg:col-span-2"
      >
        {revenue.loading ? (
          <LoadingState />
        ) : revenue.error ? (
          <ErrorState message={revenue.error} onRetry={revenue.reload} />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0 0)" />
              <XAxis dataKey="month" stroke="oklch(0.55 0 0)" fontSize={12} />
              <YAxis stroke="oklch(0.55 0 0)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid oklch(0.9 0 0)",
                  fontSize: 12,
                }}
              />
              <Bar dataKey="income" fill="oklch(0.55 0.18 250)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      <ChartCard title="Occupancy" subtitle="Occupied vs vacant units">
        {occupancy.loading ? (
          <LoadingState />
        ) : occupancy.error ? (
          <ErrorState message={occupancy.error} onRetry={occupancy.reload} />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={occupancyData}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
              >
                {occupancyData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid oklch(0.9 0 0)",
                  fontSize: 12,
                }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      <ChartCard
        title="Arrears trend"
        subtitle="Outstanding rent over time"
        className="lg:col-span-3"
      >
        {revenue.loading ? (
          <LoadingState />
        ) : revenue.error ? (
          <ErrorState message={revenue.error} onRetry={revenue.reload} />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0 0)" />
              <XAxis dataKey="month" stroke="oklch(0.55 0 0)" fontSize={12} />
              <YAxis stroke="oklch(0.55 0 0)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid oklch(0.9 0 0)",
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="arrears"
                stroke="oklch(0.65 0.18 30)"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </ChartCard>
    </div>
  );
}
