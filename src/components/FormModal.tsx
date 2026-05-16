import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function FormModal({
  trigger,
  title,
  description,
  children,
  onSubmit,
  submitLabel = "Save",
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: {
  trigger?: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
  submitLabel?: string;
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
}) {
  const [internal, setInternal] = useState(false);
  const open = controlledOpen ?? internal;
  const setOpen = setControlledOpen ?? setInternal;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit(e);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">{children}</div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">{submitLabel}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function StatusBadge({
  status,
}: {
  status: "paid" | "pending" | "overdue" | "occupied" | "vacant" | "maintenance" | "unread" | "read" | string;
}) {
  const cls: Record<string, string> = {
    paid: "bg-[oklch(0.94_0.07_160)] text-[oklch(0.35_0.12_160)]",
    occupied: "bg-[oklch(0.94_0.07_160)] text-[oklch(0.35_0.12_160)]",
    read: "bg-secondary text-muted-foreground",
    pending: "bg-[oklch(0.95_0.08_75)] text-[oklch(0.4_0.13_75)]",
    maintenance: "bg-[oklch(0.95_0.08_75)] text-[oklch(0.4_0.13_75)]",
    vacant: "bg-[oklch(0.95_0.08_75)] text-[oklch(0.4_0.13_75)]",
    overdue: "bg-[oklch(0.93_0.09_25)] text-[oklch(0.4_0.18_25)]",
    unread: "bg-primary/10 text-primary",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium capitalize ${cls[status] || "bg-secondary text-muted-foreground"}`}>
      {status}
    </span>
  );
}
