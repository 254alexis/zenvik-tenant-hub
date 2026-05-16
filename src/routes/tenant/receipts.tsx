import { useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useStore } from "@/lib/store";
import { useSession } from "@/hooks/useSession";
import { downloadReceipt } from "@/lib/receipt";

export const Route = createFileRoute("/tenant/receipts")({
  component: TenantReceipts,
});

function TenantReceipts() {
  const session = useSession();
  const tenantId = session?.user_id ? `t${session.user_id}` : "t1";
  const { data } = useStore();

  const rows = useMemo(
    () =>
      data.payments
        .filter((p) => p.tenant_id === tenantId)
        .map((p) => {
          const tenant = data.tenants.find((t) => t.id === p.tenant_id);
          const unit = tenant ? data.units.find((u) => u.id === tenant.unit_id) : null;
          return { ...p, tenant_name: tenant?.name ?? "—", unit_label: unit?.label ?? null };
        }),
    [data, tenantId],
  );

  return (
    <AppLayout allow={["tenant"]}>
      <div className="space-y-6 max-w-5xl">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Receipts</h1>
          <p className="text-muted-foreground mt-1">Download proof of payment for any past transaction.</p>
        </div>

        <DataTable
          rows={rows}
          searchKeys={["id", "invoice_id", "method"]}
          searchPlaceholder="Search receipts…"
          empty="No receipts yet."
          columns={[
            { key: "id", label: "Receipt #" },
            { key: "date", label: "Date" },
            { key: "invoice_id", label: "Invoice", hideOnMobile: true },
            { key: "method", label: "Method", hideOnMobile: true },
            {
              key: "amount",
              label: "Amount",
              render: (r) => `$${r.amount.toLocaleString()}`,
            },
            {
              key: "actions",
              label: "",
              className: "text-right",
              render: (r) => (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    downloadReceipt({
                      id: r.id,
                      date: r.date,
                      tenant: r.tenant_name,
                      unit: r.unit_label,
                      invoice_id: r.invoice_id,
                      method: r.method,
                      amount: r.amount,
                    })
                  }
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              ),
            },
          ]}
        />
      </div>
    </AppLayout>
  );
}
