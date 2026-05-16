import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

export function AdminChartCard({
  title,
  subtitle,
  action,
  children,
  className,
  height = "h-72",
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  height?: string;
}) {
  return (
    <Card className={`p-6 shadow-[var(--shadow-card)] border-border/60 ${className ?? ""}`}>
      <div className="flex items-start justify-between mb-4 gap-3">
        <div>
          <h3 className="font-semibold">{title}</h3>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {action}
      </div>
      <div className={height}>{children}</div>
    </Card>
  );
}
