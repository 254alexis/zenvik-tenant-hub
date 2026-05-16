import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { MaintenanceView } from "@/routes/maintenance";
import { useSession } from "@/hooks/useSession";

export const Route = createFileRoute("/tenant/maintenance")({
  component: TenantMaintenance,
});

function TenantMaintenance() {
  const session = useSession();
  const tenantId = session?.user_id ? String(session.user_id) : "";
  return (
    <AppLayout allow={["tenant"]}>
      <MaintenanceView tenantOnly={tenantId} />
    </AppLayout>
  );
}
