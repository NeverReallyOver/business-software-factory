import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

/** Centered loading indicator for data-driven views. */
export function LoadingState({
  label = "Loading…",
  className,
}: {
  label?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 px-6 py-12 text-sm text-muted-foreground",
        className
      )}
    >
      <Spinner className="size-5" />
      <span>{label}</span>
    </div>
  )
}
