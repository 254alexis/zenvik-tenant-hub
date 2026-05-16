import { useEffect, useState } from "react";
import { getSession, type Session } from "@/lib/session";

export function useSession(): Session | null {
  const [session, setSessionState] = useState<Session | null>(() => getSession());

  useEffect(() => {
    const sync = () => setSessionState(getSession());
    window.addEventListener("zv:session", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("zv:session", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return session;
}
