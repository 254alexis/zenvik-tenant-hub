import { useEffect, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, AlertCircle } from "lucide-react";
import { apiFetch } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export type Column = {
  key: string;
  label: string;
  render?: (row: any) => React.ReactNode;
};

export function ResourcePage({
  title,
  description,
  endpoint,
  columns,
  createLabel,
  emptyHint,
}: {
  title: string;
  description: string;
  endpoint: string;
  columns: Column[];
  createLabel: string;
  emptyHint?: string;
}) {
  const [rows, setRows] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    setError(null);
    setRows(null);
    apiFetch<any>(endpoint)
      .then((res) => {
        if (!alive) return;
        const data = Array.isArray(res) ? res : res?.data || res?.items || [];
        setRows(Array.isArray(data) ? data : []);
      })
      .catch((e) => alive && setError(e.message));
    return () => {
      alive = false;
    };
  }, [endpoint]);

  return (
    <AppLayout>
      <div className="space-y-6 max-w-7xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
            <p className="text-muted-foreground mt-1">{description}</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            {createLabel}
          </Button>
        </div>

        <Card className="shadow-[var(--shadow-card)] overflow-hidden">
          {error && (
            <div className="p-4 border-b border-border bg-[oklch(0.97_0.04_25)] text-[oklch(0.4_0.18_25)] flex items-start gap-2 text-sm">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <div>
                <div className="font-medium">Couldn't load live data</div>
                <div className="text-xs opacity-80">{error}</div>
              </div>
            </div>
          )}
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((c) => (
                  <TableHead key={c.key}>{c.label}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows === null && !error
                ? Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      {columns.map((c) => (
                        <TableCell key={c.key}>
                          <Skeleton className="h-4 w-24" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : (rows ?? []).map((row, i) => (
                    <TableRow key={row.id ?? i}>
                      {columns.map((c) => (
                        <TableCell key={c.key}>
                          {c.render ? c.render(row) : (row[c.key] ?? "—")}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              {rows && rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center py-12 text-muted-foreground text-sm">
                    {emptyHint || "No records yet."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </AppLayout>
  );
}

export { Badge };
