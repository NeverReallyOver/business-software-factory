"use server";

import { revalidatePath } from "next/cache";

import { requireRole } from "@/features/auth/server";
import { logEvent } from "@/features/audit/log";
import { createClient } from "@/lib/supabase/server";
import { appSettingsSchema, type AppSettingsInput } from "./schemas";

export type SettingsResult = { error?: string; success?: string };

/** Updates the singleton workspace settings. Owner only (also enforced by RLS). */
export async function updateAppSettings(
  input: AppSettingsInput,
): Promise<SettingsResult> {
  const parsed = appSettingsSchema.safeParse(input);
  if (!parsed.success) return { error: "Please check the form and try again." };

  await requireRole(["owner"]);
  const supabase = await createClient();

  const { error } = await supabase
    .from("app_settings")
    .update({
      app_name: parsed.data.appName,
      support_email: parsed.data.supportEmail ? parsed.data.supportEmail : null,
    })
    .eq("id", 1);

  if (error) return { error: "Could not save settings. Please try again." };

  await logEvent("settings.updated", {
    targetType: "app_settings",
    targetId: "1",
    metadata: { app_name: parsed.data.appName },
  });

  revalidatePath("/", "layout");
  return { success: "Settings saved." };
}
