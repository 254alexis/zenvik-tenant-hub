import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { DocumentsView } from "@/routes/documents";
import { useSession } from "@/hooks/useSession";

export const Route = createFileRoute("/tenant/documents")({
  component: TenantDocuments,
});

function TenantDocuments() {
  const session = useSession();
  const tenantId = session?.user_id ? `t${session.user_id}` : "t1";
  return (
    <AppLayout allow={["tenant"]}>
      <DocumentsView tenantOnly={tenantId} />
    </AppLayout>
  );
}
