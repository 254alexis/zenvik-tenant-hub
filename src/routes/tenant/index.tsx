import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, CreditCard, Receipt, Home, Download } from "lucide-react";

export const Route = createFileRoute("/tenant/")({
  component: TenantDashboard,
});

const invoices = [
  { id: "INV-2041", period: "Nov 2025", amount: "$2,100", due: "Nov 1", status: "Due" },
  { id: "INV-2018", period: "Oct 2025", amount: "$2,100", due: "Oct 1", status: "Paid" },
  { id: "INV-1995", period: "Sep 2025", amount: "$2,100", due: "Sep 1", status: "Paid" },
];

function TenantDashboard() {
  return (
    <AppLayout allow={["tenant"]}>
      <div className="space-y-8 max-w-5xl">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Welcome home</h1>
          <p className="text-muted-foreground mt-1">Apt 7A · Eastview Apartments</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Next invoice" value="$2,100" delta="Due Nov 1" icon={FileText} tone="warning" />
          <StatCard label="Paid this year" value="$21,000" delta="10 invoices" icon={CreditCard} tone="success" />
          <StatCard label="Lease ends" value="Jun 2026" delta="7 months left" icon={Home} />
        </div>

        <Card className="p-6 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold">Invoices & receipts</h3>
              <p className="text-sm text-muted-foreground">Your billing history</p>
            </div>
            <Button size="sm">Pay now</Button>
          </div>
          <div className="divide-y divide-border">
            {invoices.map((i) => (
              <div key={i.id} className="flex items-center justify-between py-3">
                <div>
                  <div className="text-sm font-medium">{i.id}</div>
                  <div className="text-xs text-muted-foreground">{i.period} · Due {i.due}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">{i.amount}</span>
                  <Badge
                    variant="secondary"
                    className={
                      i.status === "Paid"
                        ? "bg-[oklch(0.94_0.07_160)] text-[oklch(0.35_0.12_160)]"
                        : "bg-[oklch(0.95_0.08_75)] text-[oklch(0.4_0.13_75)]"
                    }
                  >
                    {i.status}
                  </Badge>
                  <Button size="icon" variant="ghost" aria-label="Download receipt">
                    <Receipt className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" aria-label="Download invoice">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
