import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { Json } from "@/types/database";

/**
 * Records an audit event for the current user. Best-effort: a logging failure
 * is swallowed so it never breaks the action being audited. The actor is
 * captured server-side by the `log_event` DB function, not from the caller.
 */
export async function logEvent(
  action: string,
  opts?: { targetType?: string; targetId?: string; metadata?: Record<string, Json> },
): Promise<void> {
  try {
    const supabase = await createClient();
    await supabase.rpc("log_event", {
      p_action: action,
      p_target_type: opts?.targetType ?? null,
      p_target_id: opts?.targetId ?? null,
      p_metadata: (opts?.metadata ?? {}) as Json,
    });
  } catch {
    // Intentionally ignored — auditing must not break the primary action.
  }
}
