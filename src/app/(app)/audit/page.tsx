import type { Metadata } from "next";

import { PageHeader } from "@/components/shared/page-header";
import { requireRole } from "@/features/auth/server";
import { AuditTable } from "@/features/audit/components/audit-table";
import { listAuditLogs } from "@/features/audit/queries";

export const metadata: Metadata = { title: "Activity" };

export default async function AuditPage() {
  await requireRole(["owner", "admin"]);
  const logs = await listAuditLogs();

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <PageHeader
        title="Activity"
        description="Recent administrative actions in this workspace."
      />
      <AuditTable logs={logs} />
    </div>
  );
}
