import "server-only";

import { appConfig } from "@/config/app";
import { createClient } from "@/lib/supabase/server";
import type { AppSettings } from "@/types/database";

/**
 * Reads the singleton workspace settings. Returns a safe default if the row is
 * unavailable so the shell always has an app name.
 */
export async function getAppSettings(): Promise<AppSettings> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("app_settings")
    .select("*")
    .eq("id", 1)
    .single();

  return (
    data ?? {
      id: 1,
      app_name: appConfig.name,
      support_email: null,
      updated_at: new Date(0).toISOString(),
    }
  );
}
