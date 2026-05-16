import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/StatCard";
import { AdminChartCard } from "@/components/admin/AdminChartCard";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Activity, AlertTriangle, CheckCircle2, Cpu, Database, Server, Clock } from "lucide-react";

export const Route = createFileRoute("/admin/monitoring")({
  component: AdminMonitoring,
});

const LATENCY = Array.from({ length: 24 }).map((_, i) => ({
  t: `${i}:00`,
  p50: 60 + Math.round(Math.sin(i / 2) * 15 + Math.random() * 10),
  p95: 140 + Math.round(Math.cos(i / 3) * 30 + Math.random() * 20),
}));

const REQUESTS = Array.from({ length: 24 }).map((_, i) => ({
  t: `${i}:00`,
  ok: 4200 + Math.round(Math.sin(i / 3) * 800 + Math.random() * 400),
  err: Math.round(20 + Math.random() * 60),
}));

const ERRORS = [
  { code: "500", count: 142 },
  { code: "502", count: 38 },
  { code: "503", count: 21 },
  { code: "404", count: 612 },
  { code: "401", count: 184 },
];

const SERVICES = [
  { name: "API gateway", status: "Operational", latency: "112ms", uptime: "99.99%", ok: true },
  { name: "Auth service", status: "Operational", latency: "44ms", uptime: "99.98%", ok: true },
  { name: "Postgres primary", status: "Operational", latency: "8ms", uptime: "99.99%", ok: true },
  { name: "Background workers", status: "Degraded", latency: "queue +18s", uptime: "99.71%", ok: false },
  { name: "Email (SES)", status: "Operational", latency: "—", uptime: "99.94%", ok: true },
  { name: "Object storage", status: "Operational", latency: "—", uptime: "99.99%", ok: true },
];

const INCIDENTS = [
  { when: "2h ago", title: "Background workers degraded", severity: "Minor" },
  { when: "Yesterday", title: "Scheduled DB maintenance", severity: "Info" },
  { when: "3 days ago", title: "Elevated 5xx on /invoices", severity: "Resolved" },
];

function AdminMonitoring() {
  return (
    <AppLayout allow={["super_admin"]}>
      <div className="space-y-8 max-w-7xl">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">System monitoring</h1>
            <p className="text-muted-foreground mt-1">
              Real-time health, performance, and incidents.
            </p>
          </div>
          <Badge variant="secondary" className="gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[oklch(0.7_0.16_160)] animate-pulse" />
            Live
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="API uptime" value="99.98%" delta="Last 30 days" icon={Activity} tone="success" />
          <StatCard label="p95 latency" value="142ms" delta="-12ms vs yesterday" icon={Clock} tone="success" />
          <StatCard label="Error rate" value="0.42%" delta="+0.05% vs avg" icon={AlertTriangle} tone="warning" />
          <StatCard label="DB CPU" value="38%" delta="Healthy" icon={Cpu} tone="success" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AdminChartCard
            title="Request latency (24h)"
            subtitle="p50 and p95 in ms"
            className="lg:col-span-2"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={LATENCY}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0 0)" />
                <XAxis dataKey="t" stroke="oklch(0.55 0 0)" fontSize={11} interval={2} />
                <YAxis stroke="oklch(0.55 0 0)" fontSize={11} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid oklch(0.9 0 0)", fontSize: 12 }} />
                <Line type="monotone" dataKey="p50" stroke="oklch(0.55 0.18 260)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="p95" stroke="oklch(0.65 0.18 30)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </AdminChartCard>

          <AdminChartCard title="Error breakdown" subtitle="HTTP status (last 24h)">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ERRORS}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0 0)" />
                <XAxis dataKey="code" stroke="oklch(0.55 0 0)" fontSize={12} />
                <YAxis stroke="oklch(0.55 0 0)" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid oklch(0.9 0 0)", fontSize: 12 }} />
                <Bar dataKey="count" fill="oklch(0.65 0.18 30)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </AdminChartCard>

          <AdminChartCard
            title="Throughput"
            subtitle="Requests / hour"
            className="lg:col-span-3"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REQUESTS}>
                <defs>
                  <linearGradient id="req" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.68 0.17 200)" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="oklch(0.68 0.17 200)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0 0)" />
                <XAxis dataKey="t" stroke="oklch(0.55 0 0)" fontSize={11} interval={2} />
                <YAxis stroke="oklch(0.55 0 0)" fontSize={11} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid oklch(0.9 0 0)", fontSize: 12 }} />
                <Area type="monotone" dataKey="ok" stroke="oklch(0.68 0.17 200)" fill="url(#req)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </AdminChartCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 shadow-[var(--shadow-card)] lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Server className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Services</h3>
            </div>
            <div className="divide-y divide-border">
              {SERVICES.map((s) => (
                <div key={s.name} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    {s.ok ? (
                      <CheckCircle2 className="h-4 w-4 text-[oklch(0.55_0.16_160)] shrink-0" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-[oklch(0.65_0.16_75)] shrink-0" />
                    )}
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">{s.name}</div>
                      <div className="text-xs text-muted-foreground">
                        Uptime {s.uptime} · {s.latency}
                      </div>
                    </div>
                  </div>
                  <Badge variant={s.ok ? "secondary" : "destructive"}>{s.status}</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-2 mb-4">
              <Database className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Recent incidents</h3>
            </div>
            <ul className="space-y-3">
              {INCIDENTS.map((i) => (
                <li key={i.title} className="text-sm">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium truncate">{i.title}</span>
                    <Badge variant="outline" className="text-[10px] shrink-0">
                      {i.severity}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{i.when}</div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
