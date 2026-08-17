import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { AuditLog } from "@/types/database";

/**
 * Lists recent audit events, newest first. RLS restricts the select to
 * owner/admin, so callers must still gate the page with `requireRole`.
 */
export async function listAuditLogs(limit = 100): Promise<AuditLog[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("audit_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  return data ?? [];
}
