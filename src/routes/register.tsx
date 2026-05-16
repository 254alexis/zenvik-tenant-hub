import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Building2, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

import { ROLE_LABEL, type Role } from "@/lib/session";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

const ROLES: Role[] = ["landlord", "tenant", "staff"];

function RegisterPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState<Role>("landlord");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const validate = (): string | null => {
    if (!fullName.trim()) return "Full name is required.";
    if (fullName.trim().length > 100) return "Full name is too long.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email.";
    if (!/^[+\d][\d\s\-()]{6,20}$/.test(phone)) return "Enter a valid phone number.";
    if (password.length < 8) return "Password must be at least 8 characters.";
    if (password !== confirm) return "Passwords do not match.";
    return null;
  };

  const submit = async (e?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    e?.stopPropagation();
    setError(null);
    setSuccess(null);

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://tenant.zenviktechnologies.com/api/register.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: fullName.trim(),
            email: email.trim(),
            password,
          }),
        },
      );
      const res = await response.json().catch(() => ({} as any));

      if (res?.status !== "success") {
        throw new Error(res?.message || "Registration failed");
      }

      setSuccess("Account created. Redirecting to login…");
      toast.success(`Welcome, ${fullName.split(" ")[0]}! Please sign in.`);
      setTimeout(() => navigate({ to: "/login" }), 800);
    } catch (err: any) {
      setError(err.message || "Registration failed");
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
            Get started in minutes.
          </h1>
          <p className="text-primary-foreground/80">
            Create your Zenvik account and bring properties, tenants and
            payments into one modern workspace.
          </p>
          <ul className="space-y-2 text-sm text-primary-foreground/80 pt-4">
            <li>• Multi-tenant by design</li>
            <li>• Built-in payments &amp; invoicing</li>
            <li>• Role-based dashboards</li>
          </ul>
        </div>
        <div className="text-xs text-primary-foreground/60">
          © {new Date().getFullYear()} Zenvik Technologies
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-md p-8 shadow-[var(--shadow-card)]">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold tracking-tight">
              Create your account
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              It only takes a minute.
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="mb-4 border-primary/30">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={submit} noValidate className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jane Doe"
                autoComplete="name"
                required
              />
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
              <Label htmlFor="phone">Phone number</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 555 123 4567"
                autoComplete="tel"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm</Label>
                <Input
                  id="confirm"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>I am a</Label>
              <div className="grid grid-cols-3 gap-2">
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

            <Button
              type="button"
              className="w-full"
              disabled={loading}
              onClick={(event) => {
                void submit(event);
              }}
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Creating account…" : "Create account"}
            </Button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
