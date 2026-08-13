import { cn } from "@/lib/utils";

/** Top-of-form error or success message. */
export function FormStatus({ error, success }: { error?: string; success?: string }) {
  if (!error && !success) return null;
  return (
    <p
      role="status"
      className={cn(
        "rounded-lg px-3 py-2 text-sm",
        error ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary",
      )}
    >
      {error ?? success}
    </p>
  );
}
