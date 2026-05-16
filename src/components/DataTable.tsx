import { useMemo, useState, useEffect, ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, ChevronLeft, ChevronRight, AlertCircle, RefreshCw, Inbox } from "lucide-react";

export type Column<T> = {
  key: string;
  label: string;
  render?: (row: T) => ReactNode;
  className?: string;
  sortable?: boolean;
  hideOnMobile?: boolean;
};

export type FilterDef = {
  key: string;
  label: string;
  options: { value: string; label: string }[];
};

export function DataTable<T extends Record<string, any>>({
  rows,
  columns,
  loading,
  error,
  onRetry,
  searchKeys,
  searchPlaceholder = "Search…",
  filters,
  pageSize = 10,
  empty = "No records found.",
  rowKey = (r) => r.id,
  onRowClick,
  mobileCard,
}: {
  rows: T[] | null | undefined;
  columns: Column<T>[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  searchKeys?: (keyof T | string)[];
  searchPlaceholder?: string;
  filters?: FilterDef[];
  pageSize?: number;
  empty?: string;
  rowKey?: (row: T) => string;
  onRowClick?: (row: T) => void;
  mobileCard?: (row: T) => ReactNode;
}) {
  const [q, setQ] = useState("");
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [q, filterValues, rows]);

  const filtered = useMemo(() => {
    let list = rows ?? [];
    const term = q.trim().toLowerCase();
    if (term && searchKeys?.length) {
      list = list.filter((r) =>
        searchKeys.some((k) => String(r[k as string] ?? "").toLowerCase().includes(term)),
      );
    }
    for (const [k, v] of Object.entries(filterValues)) {
      if (v && v !== "all") list = list.filter((r) => String(r[k] ?? "") === v);
    }
    return list;
  }, [rows, q, filterValues, searchKeys]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = page > totalPages ? totalPages : page;
  const start = (current - 1) * pageSize;
  const pageRows = filtered.slice(start, start + pageSize);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        {searchKeys && searchKeys.length > 0 && (
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={searchPlaceholder}
              className="pl-9 bg-secondary/60 border-0"
            />
          </div>
        )}
        {filters?.map((f) => (
          <select
            key={f.key}
            value={filterValues[f.key] ?? "all"}
            onChange={(e) => setFilterValues((s) => ({ ...s, [f.key]: e.target.value }))}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm capitalize min-w-[140px]"
          >
            <option value="all">All {f.label.toLowerCase()}</option>
            {f.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        ))}
      </div>

      <Card className="shadow-[var(--shadow-card)] overflow-hidden">
        {error && !loading && (
          <div className="p-6 text-center">
            <div className="mx-auto h-10 w-10 rounded-full bg-[oklch(0.97_0.04_25)] flex items-center justify-center mb-3">
              <AlertCircle className="h-5 w-5 text-[oklch(0.55_0.2_25)]" />
            </div>
            <h4 className="font-medium text-sm">Couldn't load data</h4>
            <p className="text-xs text-muted-foreground mt-1">{error}</p>
            {onRetry && (
              <Button variant="outline" size="sm" className="mt-4" onClick={onRetry}>
                <RefreshCw className="h-3.5 w-3.5 mr-2" /> Try again
              </Button>
            )}
          </div>
        )}

        {!error && (
          <>
            {/* Desktop table */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    {columns.map((c) => (
                      <TableHead key={c.key} className={c.className}>
                        {c.label}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <TableRow key={i}>
                          {columns.map((c) => (
                            <TableCell key={c.key}>
                              <Skeleton className="h-4 w-24" />
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    : pageRows.map((row) => (
                        <TableRow
                          key={rowKey(row)}
                          onClick={onRowClick ? () => onRowClick(row) : undefined}
                          className={onRowClick ? "cursor-pointer" : ""}
                        >
                          {columns.map((c) => (
                            <TableCell key={c.key} className={c.className}>
                              {c.render ? c.render(row) : (row[c.key] ?? "—")}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                  {!loading && pageRows.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="text-center py-12 text-muted-foreground text-sm"
                      >
                        <Inbox className="h-5 w-5 mx-auto mb-2 opacity-50" />
                        {empty}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-border">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="p-4 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-48" />
                    </div>
                  ))
                : pageRows.map((row) => (
                    <div
                      key={rowKey(row)}
                      onClick={onRowClick ? () => onRowClick(row) : undefined}
                      className={`p-4 ${onRowClick ? "cursor-pointer hover:bg-secondary/40" : ""}`}
                    >
                      {mobileCard ? (
                        mobileCard(row)
                      ) : (
                        <div className="space-y-1">
                          {columns
                            .filter((c) => !c.hideOnMobile)
                            .map((c) => (
                              <div key={c.key} className="flex justify-between gap-3 text-sm">
                                <span className="text-muted-foreground">{c.label}</span>
                                <span className="font-medium text-right">
                                  {c.render ? c.render(row) : (row[c.key] ?? "—")}
                                </span>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  ))}
              {!loading && pageRows.length === 0 && (
                <div className="text-center py-12 text-muted-foreground text-sm">
                  <Inbox className="h-5 w-5 mx-auto mb-2 opacity-50" />
                  {empty}
                </div>
              )}
            </div>

            {filtered.length > pageSize && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-secondary/20">
                <div className="text-xs text-muted-foreground">
                  Showing <span className="font-medium text-foreground">{start + 1}</span>–
                  <span className="font-medium text-foreground">
                    {Math.min(start + pageSize, filtered.length)}
                  </span>{" "}
                  of <span className="font-medium text-foreground">{filtered.length}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={current === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="text-xs px-2 tabular-nums">
                    {current} / {totalPages}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={current === totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
}
