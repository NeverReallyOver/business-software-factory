import { ScrollText } from "lucide-react";

import { DataTable, type Column } from "@/components/shared/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import type { AuditLog } from "@/types/database";

const ACTION_LABELS: Record<string, string> = {
  "user.role_changed": "Role changed",
  "user.invited": "User invited",
  "settings.updated": "Settings updated",
};

function actionLabel(action: string): string {
  return ACTION_LABELS[action] ?? action;
}

function details(log: AuditLog): string {
  const parts: string[] = [];
  if (log.target_id) parts.push(log.target_id);

  const meta = (log.metadata ?? {}) as Record<string, unknown>;
  for (const [key, value] of Object.entries(meta)) {
    parts.push(`${key}: ${String(value)}`);
  }
  return parts.join(" · ") || "—";
}

/** Read-only table of recent audit events. */
export function AuditTable({ logs }: { logs: AuditLog[] }) {
  const columns: Column<AuditLog>[] = [
    {
      key: "time",
      header: "When",
      cell: (log) => new Date(log.created_at).toLocaleString(),
      className: "whitespace-nowrap text-muted-foreground",
    },
    { key: "actor", header: "Actor", cell: (log) => log.actor_email ?? "—" },
    { key: "action", header: "Action", cell: (log) => actionLabel(log.action) },
    {
      key: "details",
      header: "Details",
      cell: (log) => details(log),
      className: "text-muted-foreground",
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={logs}
      getRowKey={(log) => log.id}
      emptyState={
        <EmptyState
          icon={ScrollText}
          title="No activity yet"
          description="Administrative actions will appear here."
          className="border-0"
        />
      }
    />
  );
}
