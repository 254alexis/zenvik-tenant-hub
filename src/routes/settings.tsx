import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSession } from "@/hooks/useSession";
import { ROLE_LABEL } from "@/lib/session";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const session = useSession();
  return (
    <AppLayout>
      <div className="max-w-3xl space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Signed in as {session?.email || session?.user_id} · {session ? ROLE_LABEL[session.role] : ""}
          </p>
        </div>
        <Card className="p-6 space-y-6 shadow-[var(--shadow-card)]">
          <div>
            <h3 className="font-semibold">Profile</h3>
            <p className="text-sm text-muted-foreground">Update your account details.</p>
          </div>
          <Separator />
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input defaultValue={session?.name || ""} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue={session?.email || ""} />
            </div>
            <div className="space-y-2">
              <Label>User ID</Label>
              <Input value={session?.user_id || ""} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Landlord ID</Label>
              <Input value={session?.landlord_id || "—"} readOnly />
            </div>
          </div>
          <div className="flex justify-end">
            <Button>Save changes</Button>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
