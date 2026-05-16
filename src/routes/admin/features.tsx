import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleRight, Search, Plus } from "lucide-react";

export const Route = createFileRoute("/admin/features")({
  component: AdminFeatures,
});

type Flag = {
  key: string;
  name: string;
  description: string;
  env: "Production" | "Staging" | "All";
  rollout: number;
  enabled: boolean;
  category: "Billing" | "Tenant portal" | "Mobile" | "AI" | "Reporting";
};

const FLAGS: Flag[] = [
  { key: "ai_lease_summary", name: "AI lease summary", description: "Generate plain-English lease summaries for tenants.", env: "Production", rollout: 35, enabled: true, category: "AI" },
  { key: "tenant_chat", name: "Tenant chat", description: "Realtime messaging between tenants and landlords.", env: "Production", rollout: 100, enabled: true, category: "Tenant portal" },
  { key: "stripe_payouts", name: "Stripe Connect payouts", description: "Direct payouts to landlord bank accounts.", env: "Production", rollout: 80, enabled: true, category: "Billing" },
  { key: "mobile_v2", name: "Mobile app v2", description: "Redesigned tenant mobile experience.", env: "Staging", rollout: 25, enabled: false, category: "Mobile" },
  { key: "advanced_reports", name: "Advanced reports", description: "Cohort and segment-based reporting.", env: "Production", rollout: 60, enabled: true, category: "Reporting" },
  { key: "ai_arrears", name: "AI arrears prediction", description: "Predict likelihood of late payment per tenant.", env: "Staging", rollout: 10, enabled: false, category: "AI" },
  { key: "sso_scim", name: "SSO + SCIM", description: "Enterprise SSO via SAML and SCIM provisioning.", env: "Production", rollout: 100, enabled: true, category: "Billing" },
];

function AdminFeatures() {
  const [flags, setFlags] = useState(FLAGS);
  const [q, setQ] = useState("");

  const toggle = (key: string) =>
    setFlags((fs) => fs.map((f) => (f.key === key ? { ...f, enabled: !f.enabled } : f)));

  const setRollout = (key: string, rollout: number) =>
    setFlags((fs) => fs.map((f) => (f.key === key ? { ...f, rollout } : f)));

  const filtered = flags.filter((f) =>
    [f.name, f.key, f.description, f.category].some((v) =>
      v.toLowerCase().includes(q.toLowerCase()),
    ),
  );

  const grouped = filtered.reduce<Record<string, Flag[]>>((acc, f) => {
    (acc[f.category] ||= []).push(f);
    return acc;
  }, {});

  return (
    <AppLayout allow={["super_admin"]}>
      <div className="space-y-8 max-w-5xl">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Feature flags</h1>
            <p className="text-muted-foreground mt-1">
              Roll out features gradually across workspaces.
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4" /> New flag
          </Button>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search flags…"
            className="pl-9 bg-secondary/60 border-0"
          />
        </div>

        {Object.entries(grouped).map(([cat, items]) => (
          <div key={cat}>
            <div className="flex items-center gap-2 mb-3">
              <ToggleRight className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {cat}
              </h2>
            </div>
            <Card className="divide-y divide-border shadow-[var(--shadow-card)]">
              {items.map((f) => (
                <div key={f.key} className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="text-sm font-medium">{f.name}</div>
                      <code className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
                        {f.key}
                      </code>
                      <Badge variant="outline" className="text-[10px]">
                        {f.env}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{f.description}</p>
                  </div>

                  <div className="flex items-center gap-4 sm:w-72">
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Rollout</span>
                        <span className="tabular-nums font-medium">{f.rollout}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={f.rollout}
                        onChange={(e) => setRollout(f.key, Number(e.target.value))}
                        disabled={!f.enabled}
                        className="w-full h-1.5 rounded-full bg-secondary accent-primary disabled:opacity-50"
                      />
                    </div>
                    <Switch checked={f.enabled} onCheckedChange={() => toggle(f.key)} />
                  </div>
                </div>
              ))}
            </Card>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
