import { Loader2, AlertCircle, RefreshCw, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center py-16 text-muted-foreground">
      <Loader2 className="h-5 w-5 animate-spin mr-2" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="h-10 w-10 rounded-full bg-[oklch(0.97_0.04_25)] flex items-center justify-center mb-3">
        <AlertCircle className="h-5 w-5 text-[oklch(0.55_0.2_25)]" />
      </div>
      <h4 className="font-medium text-sm">Couldn't load data</h4>
      <p className="text-xs text-muted-foreground mt-1 max-w-md">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" className="mt-4" onClick={onRetry}>
          <RefreshCw className="h-3.5 w-3.5 mr-2" /> Try again
        </Button>
      )}
    </div>
  );
}

export function EmptyState({ message = "No records yet." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Inbox className="h-6 w-6 text-muted-foreground/50 mb-2" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
