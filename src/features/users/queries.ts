import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/types/database";

/**
 * Lists all user profiles. RLS restricts the underlying select to owners and
 * admins, so callers must still gate the page with `requireRole`.
 */
export async function listProfiles(): Promise<Profile[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: true });

  return data ?? [];
}
