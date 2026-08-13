import type { LucideIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

/** Compact metric tile for dashboards (e.g. active members, revenue). */
export function StatsCard({
  label,
  value,
  icon: Icon,
  hint,
  className,
}: {
  label: string
  value: string | number
  icon?: LucideIcon
  hint?: string
  className?: string
}) {
  return (
    <Card className={className}>
      <CardContent className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="font-heading text-2xl font-semibold tracking-tight">{value}</p>
          {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
        </div>
        {Icon ? (
          <div className="rounded-lg bg-muted p-2 text-muted-foreground">
            <Icon className="size-5" aria-hidden="true" />
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
