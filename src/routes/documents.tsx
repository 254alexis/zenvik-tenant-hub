import { useMemo, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormModal } from "@/components/FormModal";
import { useStore, type DocCategory } from "@/lib/store";
import { Download, Eye, Trash2, Upload, FileText, FileImage, File, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/documents")({
  component: DocumentsPage,
});

const CATEGORIES: { value: DocCategory; label: string }[] = [
  { value: "lease", label: "Lease" },
  { value: "id", label: "ID / KYC" },
  { value: "invoice", label: "Invoice" },
  { value: "receipt", label: "Receipt" },
  { value: "policy", label: "Policy" },
  { value: "other", label: "Other" },
];

const CAT_TONE: Record<DocCategory, string> = {
  lease: "bg-primary/10 text-primary",
  id: "bg-[oklch(0.94_0.07_280)] text-[oklch(0.4_0.17_280)]",
  invoice: "bg-[oklch(0.95_0.08_75)] text-[oklch(0.4_0.13_75)]",
  receipt: "bg-[oklch(0.94_0.07_160)] text-[oklch(0.35_0.12_160)]",
  policy: "bg-[oklch(0.93_0.07_220)] text-[oklch(0.38_0.15_220)]",
  other: "bg-secondary text-muted-foreground",
};

function iconFor(name: string) {
  const ext = name.split(".").pop()?.toLowerCase();
  if (["jpg", "jpeg", "png", "webp", "gif"].includes(ext || "")) return FileImage;
  if (["xls", "xlsx", "csv"].includes(ext || "")) return FileSpreadsheet;
  if (ext === "pdf") return FileText;
  return File;
}

function DocumentsPage() {
  return (
    <AppLayout allow={["super_admin", "landlord", "staff"]}>
      <DocumentsView />
    </AppLayout>
  );
}

export function DocumentsView({ tenantOnly }: { tenantOnly?: string } = {}) {
  const { data, addDocument, deleteDocument } = useStore();
  const [open, setOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [picked, setPicked] = useState<{ name: string; size: number } | null>(null);

  const rows = useMemo(
    () =>
      tenantOnly
        ? data.documents.filter((d) => d.tenant_id === tenantOnly || d.category === "policy")
        : data.documents,
    [data.documents, tenantOnly],
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const fd = new FormData(e.currentTarget);
    const name = picked?.name || (fd.get("name") as string);
    if (!name) {
      toast.error("Choose a file to upload");
      return;
    }
    addDocument({
      name,
      category: (fd.get("category") as DocCategory) || "other",
      size_kb: picked ? Math.max(1, Math.round(picked.size / 1024)) : 100,
      uploaded_by: "You",
      tenant_id: tenantOnly ?? null,
    });
    setPicked(null);
    toast.success("Document uploaded");
  };

  const stats = useMemo(() => {
    const byCat: Record<string, number> = {};
    rows.forEach((d) => (byCat[d.category] = (byCat[d.category] || 0) + 1));
    return byCat;
  }, [rows]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Documents</h1>
          <p className="text-muted-foreground mt-1">
            Leases, IDs, policies, invoices and receipts in one place.
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <Upload className="h-4 w-4 mr-2" /> Upload document
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        {CATEGORIES.map((c) => (
          <Card key={c.value} className="p-4">
            <div className="text-xs text-muted-foreground capitalize">{c.label}</div>
            <div className="text-2xl font-semibold mt-1">{stats[c.value] || 0}</div>
          </Card>
        ))}
      </div>

      <DataTable
        rows={rows}
        searchKeys={["name", "uploaded_by"]}
        searchPlaceholder="Search documents…"
        filters={[{ key: "category", label: "Category", options: CATEGORIES }]}
        empty="No documents uploaded yet."
        columns={[
          {
            key: "name",
            label: "Name",
            render: (r) => {
              const Icon = iconFor(r.name);
              return (
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-9 w-9 rounded-md bg-secondary flex items-center justify-center shrink-0">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium truncate">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.size_kb} KB</div>
                  </div>
                </div>
              );
            },
          },
          {
            key: "category",
            label: "Category",
            render: (r) => (
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium capitalize ${CAT_TONE[r.category as DocCategory]}`}
              >
                {r.category}
              </span>
            ),
          },
          { key: "uploaded_by", label: "Uploaded by", hideOnMobile: true },
          { key: "uploaded_at", label: "Date", hideOnMobile: true },
          {
            key: "actions",
            label: "",
            className: "text-right",
            render: (r) => (
              <div className="flex justify-end gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label="Preview"
                  onClick={() => toast.info(`Preview: ${r.name}`)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label="Download"
                  onClick={() => toast.success(`Downloading ${r.name}`)}
                >
                  <Download className="h-4 w-4" />
                </Button>
                {!tenantOnly && (
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label="Delete"
                    onClick={() => {
                      deleteDocument(r.id);
                      toast.success("Document removed");
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                )}
              </div>
            ),
          },
        ]}
      />

      <FormModal
        open={open}
        onOpenChange={setOpen}
        title="Upload document"
        description="Attach a file and assign it to a category."
        submitLabel="Upload"
        onSubmit={handleSubmit}
      >
        <div
          className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:bg-secondary/40 transition-colors"
          onClick={() => fileRef.current?.click()}
        >
          <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
          <div className="mt-2 text-sm font-medium">
            {picked ? picked.name : "Click to choose a file"}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            PDF, DOCX, JPG up to 10 MB
          </div>
          <input
            ref={fileRef}
            type="file"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) setPicked({ name: f.name, size: f.size });
            }}
          />
        </div>
        {!picked && (
          <div className="space-y-1.5">
            <Label htmlFor="name">Or enter file name</Label>
            <Input id="name" name="name" placeholder="e.g. Lease Agreement.pdf" />
          </div>
        )}
        <div className="space-y-1.5">
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            name="category"
            defaultValue="other"
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </FormModal>
    </div>
  );
}
