import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { DataTable, type Column } from "@/components/DataTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreditCard, DollarSign, RefreshCw, XCircle, MoreHorizontal, ArrowUpRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/admin/subscriptions")({
  component: AdminSubscriptions,
});

type Plan = {
  id: string;
  name: string;
  price: number;
  cadence: "mo" | "yr";
  features: string[];
  active: number;
  highlight?: boolean;
};

const PLANS: Plan[] = [
  { id: "starter", name: "Starter", price: 29, cadence: "mo", active: 48, features: ["Up to 10 units", "Email support", "1 admin seat"] },
  { id: "growth", name: "Growth", price: 99, cadence: "mo", active: 41, highlight: true, features: ["Up to 100 units", "Priority support", "5 admin seats", "Custom branding"] },
  { id: "scale", name: "Scale", price: 299, cadence: "mo", active: 22, features: ["Unlimited units", "Dedicated CSM", "20 admin seats", "API access"] },
  { id: "enterprise", name: "Enterprise", price: 999, cadence: "mo", active: 7, features: ["SLA 99.99%", "SSO / SCIM", "Custom contracts", "Onboarding"] },
];

type Subscription = {
  id: string;
  workspace: string;
  plan: string;
  seats: number;
  mrr: number;
  status: "Active" | "Past due" | "Canceled" | "Trial";
  renews: string;
};

const SUBS: Subscription[] = [
  { id: "S-5001", workspace: "Riverside Holdings", plan: "Scale", seats: 12, mrr: 299, status: "Active", renews: "2026-06-02" },
  { id: "S-5002", workspace: "Northgate Estates", plan: "Growth", seats: 5, mrr: 99, status: "Active", renews: "2026-05-30" },
  { id: "S-5003", workspace: "Hillside Realty", plan: "Starter", seats: 1, mrr: 0, status: "Trial", renews: "2026-05-28" },
  { id: "S-5004", workspace: "Eastview Group", plan: "Growth", seats: 6, mrr: 99, status: "Active", renews: "2026-06-11" },
  { id: "S-5005", workspace: "Summit Residential", plan: "Enterprise", seats: 24, mrr: 999, status: "Active", renews: "2026-08-19" },
  { id: "S-5006", workspace: "Meadowlane Group", plan: "Starter", seats: 1, mrr: 29, status: "Past due", renews: "2026-05-01" },
  { id: "S-5007", workspace: "Laketown Realty", plan: "Growth", seats: 3, mrr: 99, status: "Active", renews: "2026-06-04" },
];

const statusVariant = (s: Subscription["status"]) =>
  s === "Active" ? "secondary" : s === "Trial" ? "outline" : "destructive";

function AdminSubscriptions() {
  const [subs, setSubs] = useState(SUBS);
  const totalMrr = subs.filter((s) => s.status === "Active").reduce((a, s) => a + s.mrr, 0);
  const pastDue = subs.filter((s) => s.status === "Past due").length;
  const trials = subs.filter((s) => s.status === "Trial").length;

  const cancel = (id: string) =>
    setSubs((s) => s.map((x) => (x.id === id ? { ...x, status: "Canceled" } : x)));

  const columns: Column<Subscription>[] = [
    {
      key: "workspace",
      label: "Workspace",
      render: (r) => (
        <div>
          <div className="text-sm font-medium">{r.workspace}</div>
          <div className="text-xs text-muted-foreground">{r.id}</div>
        </div>
      ),
    },
    {
      key: "plan",
      label: "Plan",
      render: (r) => <Badge variant="outline">{r.plan}</Badge>,
    },
    { key: "seats", label: "Seats", className: "text-right" },
    {
      key: "mrr",
      label: "MRR",
      render: (r) => <span className="tabular-nums">${r.mrr}</span>,
      className: "text-right",
    },
    {
      key: "status",
      label: "Status",
      render: (r) => <Badge variant={statusVariant(r.status)}>{r.status}</Badge>,
    },
    { key: "renews", label: "Renews", hideOnMobile: true },
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
              <ArrowUpRight className="h-4 w-4" /> Change plan
            </DropdownMenuItem>
            <DropdownMenuItem>
              <RefreshCw className="h-4 w-4" /> Retry charge
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => cancel(r.id)}
            >
              <XCircle className="h-4 w-4" /> Cancel subscription
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      className: "w-12",
    },
  ];

  return (
    <AppLayout allow={["super_admin"]}>
      <div className="space-y-8 max-w-7xl">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Subscriptions</h1>
          <p className="text-muted-foreground mt-1">
            Manage plans, billing, and active subscriptions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="MRR" value={`$${totalMrr.toLocaleString()}`} icon={DollarSign} tone="success" />
          <StatCard label="Active subs" value={String(subs.filter((s) => s.status === "Active").length)} icon={CreditCard} />
          <StatCard label="Trials" value={String(trials)} icon={CheckCircle2} />
          <StatCard label="Past due" value={String(pastDue)} icon={XCircle} tone="warning" />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PLANS.map((p) => (
              <Card
                key={p.id}
                className={`p-6 shadow-[var(--shadow-card)] ${
                  p.highlight ? "border-primary ring-1 ring-primary/30" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground">{p.name}</div>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="text-3xl font-semibold tracking-tight">${p.price}</span>
                      <span className="text-xs text-muted-foreground">/{p.cadence}</span>
                    </div>
                  </div>
                  {p.highlight && <Badge>Popular</Badge>}
                </div>
                <ul className="mt-4 space-y-2 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-[oklch(0.55_0.16_160)] shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 pt-4 border-t border-border text-xs text-muted-foreground">
                  {p.active} active workspaces
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  Edit plan
                </Button>
              </Card>
            ))}
          </div>
        </div>

        <Card className="p-4 sm:p-6 shadow-[var(--shadow-card)]">
          <DataTable
            rows={subs}
            columns={columns}
            searchKeys={["workspace", "plan", "id"]}
            searchPlaceholder="Search subscriptions…"
            filters={[
              {
                key: "status",
                label: "Status",
                options: [
                  { value: "Active", label: "Active" },
                  { value: "Trial", label: "Trial" },
                  { value: "Past due", label: "Past due" },
                  { value: "Canceled", label: "Canceled" },
                ],
              },
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
            ]}
          />
        </Card>
      </div>
    </AppLayout>
  );
}
