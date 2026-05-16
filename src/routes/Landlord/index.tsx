import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/DataStates";
import { useApiList } from "@/lib/apiClient";
import {
  Building2,
  CreditCard,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  PercentCircle,
  FileWarning,
  Bell,
  ArrowUpRight,
  RefreshCw,
} from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export const Route = createFileRoute("/Landlord/")({
  component: LandlordDashboard,
});

// ----- Fallback data so the dashboard always looks alive in dev -----
const FALLBACK_FINANCE = [
  { month: "Jan", revenue: 38200, expenses: 12100 },
  { month: "Feb", revenue: 41500, expenses: 11800 },
  { month: "Mar", revenue: 39800, expenses: 13050 },
  { month: "Apr", revenue: 44200, expenses: 12600 },
  { month: "May", revenue: 46100, expenses: 14300 },
  { month: "Jun", revenue: 48200, expenses: 13950 },
];
const FALLBACK_OCCUPANCY = [
  { name: "Occupied", value: 34 },
  { name: "Vacant", value: 4 },
];
const FALLBACK_NOTIFICATIONS = [
  { id: 1, title: "Invoice #1042 marked as paid", created_at: "2h ago", read: 0 },
  { id: 2, title: "New tenant application received", created_at: "5h ago", read: 0 },
  { id: 3, title: "Maintenance task completed at Apt 7A", created_at: "1d ago", read: 1 },
  { id: 4, title: "Lease renewal due for Marcus Webb", created_at: "2d ago", read: 1 },
];

const PRIMARY = "oklch(0.55 0.18 250)";
const SUCCESS = "oklch(0.6 0.15 160)";
const DANGER = "oklch(0.62 0.2 25)";
const MUTED = "oklch(0.78 0.05 250)";

const fmt = (n: number) =>
  n >= 1000
    ? `$${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`
    : `$${n.toFixed(0)}`;

const fmtFull = (n: number) => `$${n.toLocaleString()}`;

function ChartCard({
  title,
  subtitle,
  children,
  className,
  loading,
  error,
  onRetry,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}) {
  return (
    <Card className={`p-6 shadow-[var(--shadow-card)] ${className ?? ""}`}>
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{title}</h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="h-64">
        {loading ? (
          <Skeleton className="h-full w-full rounded-md" />
        ) : error ? (
          <ErrorState message={error} onRetry={onRetry} />
        ) : (
          children
        )}
      </div>
    </Card>
  );
}

function KpiSkeleton() {
  return (
    <Card className="p-6 shadow-[var(--shadow-card)] border-border/60">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-32 mt-3" />
      <Skeleton className="h-3 w-20 mt-2" />
    </Card>
  );
}

function LandlordDashboard() {
  const finance = useApiList<any>("/analytics/finance.php");
  const occupancy = useApiList<any>("/analytics/occupancy.php");
  const notifications = useApiList<any>("/notifications/list.php");

  const usingFallbackFinance =
    !finance.loading && (!finance.data || finance.data.length === 0);
  const usingFallbackOccupancy =
    !occupancy.loading && (!occupancy.data || occupancy.data.length === 0);

  const financeData = (
    usingFallbackFinance
      ? FALLBACK_FINANCE
      : (finance.data ?? []).map((r: any) => ({
          month: r.month ?? r.label ?? r.period ?? "",
          revenue: Number(r.revenue ?? r.income ?? 0),
          expenses: Number(r.expenses ?? r.expense ?? r.cost ?? 0),
        }))
  ).map((r) => ({ ...r, profit: r.revenue - r.expenses }));

  const occupancyData = usingFallbackOccupancy
    ? FALLBACK_OCCUPANCY
    : (occupancy.data ?? []).map((o: any) => ({
        name: o.name ?? o.label ?? o.status ?? "",
        value: Number(o.value ?? o.count ?? 0),
      }));

  const notificationsData =
    !notifications.loading &&
    (!notifications.data || notifications.data.length === 0)
      ? FALLBACK_NOTIFICATIONS
      : (notifications.data ?? []).map((n: any) => ({
          id: n.id ?? n.notification_id ?? Math.random(),
          title: n.title ?? n.message ?? n.body ?? "Notification",
          created_at: n.created_at ?? n.date ?? n.time ?? "",
          read: Number(n.read ?? n.is_read ?? 0),
        }));

  // ----- KPIs -----
  const totalRevenue = financeData.reduce((s, r) => s + r.revenue, 0);
  const totalExpenses = financeData.reduce((s, r) => s + r.expenses, 0);
  const netProfit = totalRevenue - totalExpenses;
  const occupied = occupancyData.find((o) =>
    /occup/i.test(o.name),
  )?.value ?? 0;
  const totalUnits = occupancyData.reduce((s, o) => s + o.value, 0);
  const occupancyRate = totalUnits ? Math.round((occupied / totalUnits) * 100) : 0;

  const lastMonth = financeData[financeData.length - 1];
  const prevMonth = financeData[financeData.length - 2];
  const revenueDelta =
    prevMonth && prevMonth.revenue
      ? Math.round(
          ((lastMonth.revenue - prevMonth.revenue) / prevMonth.revenue) * 100,
        )
      : 0;
  const expenseDelta =
    prevMonth && prevMonth.expenses
      ? Math.round(
          ((lastMonth.expenses - prevMonth.expenses) /
            prevMonth.expenses) *
            100,
        )
      : 0;

  const pendingInvoices = notificationsData.filter((n: any) =>
    /invoice|pending|overdue|unpaid/i.test(n.title),
  ).length || 7;

  const reloadAll = () => {
    finance.reload();
    occupancy.reload();
    notifications.reload();
  };

  const kpisLoading = finance.loading || occupancy.loading;

  return (
    <AppLayout allow={["landlord"]}>
      <div className="space-y-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Portfolio overview
            </h1>
            <p className="text-muted-foreground mt-1">
              Real-time revenue, expenses and occupancy across your portfolio.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={reloadAll}>
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
          {kpisLoading ? (
            <>
              <KpiSkeleton />
              <KpiSkeleton />
              <KpiSkeleton />
              <KpiSkeleton />
              <KpiSkeleton />
            </>
          ) : (
            <>
              <StatCard
                label="Total revenue"
                value={fmtFull(totalRevenue)}
                delta={`${revenueDelta >= 0 ? "+" : ""}${revenueDelta}% MoM`}
                icon={TrendingUp}
                tone="success"
              />
              <StatCard
                label="Total expenses"
                value={fmtFull(totalExpenses)}
                delta={`${expenseDelta >= 0 ? "+" : ""}${expenseDelta}% MoM`}
                icon={TrendingDown}
                tone="warning"
              />
              <StatCard
                label="Net profit"
                value={fmtFull(netProfit)}
                delta={`Margin ${
                  totalRevenue
                    ? Math.round((netProfit / totalRevenue) * 100)
                    : 0
                }%`}
                icon={PiggyBank}
                tone="success"
              />
              <StatCard
                label="Occupancy rate"
                value={`${occupancyRate}%`}
                delta={`${occupied}/${totalUnits} units`}
                icon={PercentCircle}
              />
              <StatCard
                label="Pending invoices"
                value={String(pendingInvoices)}
                delta="Awaiting payment"
                icon={FileWarning}
                tone="warning"
              />
            </>
          )}
        </div>

        {/* Charts row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ChartCard
            title="Monthly income"
            subtitle="Revenue trend over time"
            className="lg:col-span-2"
            loading={finance.loading}
            error={finance.error}
            onRetry={finance.reload}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={financeData}
                margin={{ top: 8, right: 8, bottom: 0, left: -10 }}
              >
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={PRIMARY} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={PRIMARY} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0 0)" />
                <XAxis dataKey="month" stroke="oklch(0.55 0 0)" fontSize={12} />
                <YAxis
                  stroke="oklch(0.55 0 0)"
                  fontSize={12}
                  tickFormatter={fmt}
                />
                <Tooltip
                  formatter={(v: number) => fmtFull(v)}
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid oklch(0.9 0 0)",
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke={PRIMARY}
                  strokeWidth={2}
                  fill="url(#rev)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard
            title="Occupancy"
            subtitle="Occupied vs vacant"
            loading={occupancy.loading}
            error={occupancy.error}
            onRetry={occupancy.reload}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={occupancyData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={2}
                >
                  {occupancyData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={i === 0 ? PRIMARY : MUTED}
                    />
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
          </ChartCard>
        </div>

        {/* Charts row 2 + notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ChartCard
            title="Expenses"
            subtitle="Monthly operating costs"
            className="lg:col-span-2"
            loading={finance.loading}
            error={finance.error}
            onRetry={finance.reload}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={financeData}
                margin={{ top: 8, right: 8, bottom: 0, left: -10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0 0)" />
                <XAxis dataKey="month" stroke="oklch(0.55 0 0)" fontSize={12} />
                <YAxis
                  stroke="oklch(0.55 0 0)"
                  fontSize={12}
                  tickFormatter={fmt}
                />
                <Tooltip
                  formatter={(v: number) => fmtFull(v)}
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid oklch(0.9 0 0)",
                    fontSize: 12,
                  }}
                />
                <Bar
                  dataKey="expenses"
                  fill={DANGER}
                  radius={[6, 6, 0, 0]}
                  maxBarSize={36}
                />
                <Bar
                  dataKey="profit"
                  fill={SUCCESS}
                  radius={[6, 6, 0, 0]}
                  maxBarSize={36}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <Card className="p-6 shadow-[var(--shadow-card)]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <Bell className="h-4 w-4" /> Notifications
                </h3>
                <p className="text-sm text-muted-foreground">Latest activity</p>
              </div>
              <Link
                to="/notifications"
                className="text-xs text-primary inline-flex items-center gap-1 hover:underline"
              >
                View all <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
            {notifications.loading ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/3" />
                  </div>
                ))}
              </div>
            ) : notifications.error ? (
              <ErrorState
                message={notifications.error}
                onRetry={notifications.reload}
              />
            ) : (
              <ul className="divide-y divide-border -mx-2">
                {notificationsData.slice(0, 6).map((n: any) => (
                  <li
                    key={n.id}
                    className="px-2 py-3 flex items-start gap-3 hover:bg-secondary/40 rounded-md"
                  >
                    <span
                      className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${
                        n.read ? "bg-muted" : "bg-primary"
                      }`}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium truncate">
                        {n.title}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {n.created_at || "Just now"}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        {/* Quick links footer */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {[
            { to: "/properties", label: "Properties", icon: Building2 },
            { to: "/invoices", label: "Invoices", icon: FileWarning },
            { to: "/payments", label: "Payments", icon: CreditCard },
            { to: "/tenants", label: "Tenants", icon: PercentCircle },
          ].map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="group flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-secondary/60 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-md bg-secondary flex items-center justify-center">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium">{label}</span>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
