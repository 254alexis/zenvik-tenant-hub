import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { MaintenanceView } from "@/routes/maintenance";
import { useSession } from "@/hooks/useSession";

export const Route = createFileRoute("/tenant/maintenance")({
  component: TenantMaintenance,
});

function TenantMaintenance() {
  const session = useSession();
  // Map session user to a tenant id (demo: t1 fallback for tenant role)
  const tenantId = session?.user_id ? `t${session.user_id}` : "t1";
  return (
    <AppLayout allow={["tenant"]}>
      <MaintenanceView tenantOnly={tenantId} />
    </AppLayout>
  );
}
