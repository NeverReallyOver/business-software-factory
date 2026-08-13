import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

/** Accessible loading spinner. Give a label via `aria-label` on the wrapper. */
function Spinner({ className, ...props }: React.ComponentProps<typeof Loader2>) {
  return (
    <Loader2
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin text-muted-foreground", className)}
      {...props}
    />
  )
}

export { Spinner }
