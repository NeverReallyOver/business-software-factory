import "server-only";

import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/types/database";

/**
 * Supabase admin client using the SERVICE-ROLE key. Bypasses RLS — use only in
 * trusted server code (never in client components or route responses). Callers
 * must enforce authorization themselves before using it (see docs/SECURITY.md).
 *
 * Throws if the service-role key is not configured; callers should guard with
 * `isAdminConfigured()` and return a friendly error.
 */
export function createAdminClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");

  return createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export function isAdminConfigured(): boolean {
  return Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
}
