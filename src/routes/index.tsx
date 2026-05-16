import { createFileRoute, redirect } from "@tanstack/react-router";
import { getSession, ROLE_HOME } from "@/lib/session";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    const s = getSession();
    throw redirect({ to: s ? ROLE_HOME[s.role] : "/login" });
  },
  component: () => null,
});
