import { Navigate } from "@tanstack/react-router";
import { useSession } from "@/hooks/useSession";
import { AppLayout } from "@/components/AppLayout";
import type { Role } from "@/lib/session";

/**
 * Wraps a page so it requires a session and (optionally) one of the listed roles.
 * Redirects to /login if unauthenticated; to the user's role-home if forbidden.
 */
export function ProtectedRoute({
  children,
  allow,
}: {
  children: React.ReactNode;
  allow?: Role[];
}) {
  const session = useSession();
  if (!session) return <Navigate to="/login" />;
  if (allow && !allow.includes(session.role)) {
    return <Navigate to="/login" />;
  }
  return <AppLayout allow={allow}>{children}</AppLayout>;
}
