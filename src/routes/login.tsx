import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Building2, Loader2, AlertCircle } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { setSession, ROLE_HOME, ROLE_LABEL, type Role } from "@/lib/session";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

const ROLES: Role[] = ["super_admin", "landlord", "tenant", "staff"];

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("landlord");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError("Email and password are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await apiFetch<{
        status: string;
        message?: string;
        user?: { id: string; name: string; email: string; role?: Role };
      }>("/login.php", {
        method: "POST",
        body: JSON.stringify({ email, password, role }),
      });

      if (res.status !== "success") {
        throw new Error(res.message || "Login failed");
      }

      const u = res.user;
      if (!u) {
        throw new Error("Invalid response from server");
      }

      const finalRole: Role = (u.role as Role) || role;
      setSession({
        user_id: String(u.id),
        role: finalRole,
        landlord_id: finalRole === "landlord" ? String(u.id) : null,
        name: u.name,
        email: u.email,
      });
      toast.success(`Signed in as ${ROLE_LABEL[finalRole]}`);
      navigate({ to: ROLE_HOME[finalRole] });
    } catch (err: any) {
      setError(err.message || "Login failed");
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
            Welcome back to your property workspace.
          </h1>
          <p className="text-primary-foreground/80">
            Sign in to manage properties, tenants, payments and maintenance —
            all from one place.
          </p>
        </div>
        <div className="text-xs text-primary-foreground/60">
          © {new Date().getFullYear()} Zenvik Technologies
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-md p-8 shadow-[var(--shadow-card)]">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold tracking-tight">Sign in</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Choose your role and enter your credentials.
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label>Role</Label>
              <div className="grid grid-cols-2 gap-2">
                {ROLES.map((r) => (
                  <button
                    type="button"
                    key={r}
                    onClick={() => setRole(r)}
                    className={`text-sm px-3 py-2 rounded-md border transition-colors ${
                      role === r
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-secondary border-transparent hover:border-border"
                    }`}
                  >
                    {ROLE_LABEL[r]}
                  </button>
                ))}
              </div>
            </div>
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
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Signing in…" : "Continue"}
            </Button>
          </form>

          <div className="mt-4 text-right">
            <Link
              to="/forgot-password"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Forgot password?
            </Link>
          </div>

          <p className="text-sm text-muted-foreground text-center mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-medium hover:underline">
              Create one
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
