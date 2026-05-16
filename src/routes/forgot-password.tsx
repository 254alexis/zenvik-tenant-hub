import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Building2, Loader2, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      try {
        await apiFetch("/auth/forgot_password.php", {
          method: "POST",
          body: JSON.stringify({ email: email.trim() }),
        });
      } catch {
        // swallow — we always show generic success to avoid email enumeration
      }
      setSent(true);
      toast.success("If that account exists, a reset link is on its way.");
    } catch (err: any) {
      setError(err.message || "Could not send reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[image:var(--gradient-subtle)]">
      <div className="hidden lg:flex flex-1 bg-[image:var(--gradient-primary)] text-primary-foreground p-12 flex-col justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-white/15 backdrop-blur flex items-center justify-center">
            <Building2 className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold">Zenvik</span>
        </div>
        <div className="space-y-4 max-w-md">
          <h1 className="text-4xl font-semibold leading-tight">
            Reset your password.
          </h1>
          <p className="text-primary-foreground/80">
            Enter the email associated with your account and we'll send you a
            secure link to choose a new password.
          </p>
        </div>
        <div className="text-xs text-primary-foreground/60">
          © {new Date().getFullYear()} Zenvik Technologies
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-md p-8 shadow-[var(--shadow-card)]">
          <Link
            to="/login"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-3 w-3" /> Back to sign in
          </Link>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold tracking-tight">
              Forgot password
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              We'll email you a link to reset it.
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {sent ? (
            <Alert className="border-primary/30">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                If an account exists for <strong>{email}</strong>, you'll
                receive an email shortly with reset instructions.
              </AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  autoComplete="email"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {loading ? "Sending…" : "Send reset link"}
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
