import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  tone = "default",
}: {
  label: string;
  value: string;
  delta?: string;
  icon: LucideIcon;
  tone?: "default" | "success" | "warning";
}) {
  const toneClass =
    tone === "success"
      ? "text-[oklch(0.55_0.16_160)]"
      : tone === "warning"
        ? "text-[oklch(0.65_0.16_75)]"
        : "text-muted-foreground";
  return (
    <Card className="p-6 shadow-[var(--shadow-card)] border-border/60">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-muted-foreground">{label}</div>
          <div className="mt-2 text-3xl font-semibold tracking-tight">{value}</div>
          {delta && <div className={`mt-1 text-xs ${toneClass}`}>{delta}</div>}
        </div>
        <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
    </Card>
  );
}
