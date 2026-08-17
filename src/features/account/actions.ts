"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { requireUser } from "@/features/auth/server";
import { createClient } from "@/lib/supabase/server";
import {
  changeEmailSchema,
  changePasswordSchema,
  profileSchema,
  type ChangeEmailInput,
  type ChangePasswordInput,
  type ProfileInput,
} from "./schemas";

/** Absolute origin for building email confirmation links. */
async function getOrigin() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return configured.replace(/\/$/, "");
  const h = await headers();
  return `${h.get("x-forwarded-proto") ?? "https"}://${h.get("host")}`;
}

export type AccountResult = { error?: string; success?: string };

/** Updates the signed-in user's display name (own-profile RLS path). */
export async function updateProfile(input: ProfileInput): Promise<AccountResult> {
  const parsed = profileSchema.safeParse(input);
  if (!parsed.success) return { error: "Please check the form and try again." };

  const user = await requireUser();
  const supabase = await createClient();

  const { error } = await supabase
    .from("profiles")
    .update({ full_name: parsed.data.fullName })
    .eq("id", user.id);

  if (error) return { error: "Could not update your profile. Please try again." };

  revalidatePath("/account");
  revalidatePath("/dashboard");
  return { success: "Profile updated." };
}

/**
 * Changes the signed-in user's password. Re-authenticates with the current
 * password first so an open session alone cannot change it (SECURITY.md).
 */
export async function changePassword(
  input: ChangePasswordInput,
): Promise<AccountResult> {
  const parsed = changePasswordSchema.safeParse(input);
  if (!parsed.success) return { error: "Please check the form and try again." };

  const user = await requireUser();
  if (!user.email) return { error: "Your account has no email on file." };

  const supabase = await createClient();

  // Verify the current password by re-authenticating.
  const { error: reauthError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: parsed.data.currentPassword,
  });
  if (reauthError) return { error: "Your current password is incorrect." };

  const { error } = await supabase.auth.updateUser({
    password: parsed.data.newPassword,
  });
  if (error) return { error: error.message };

  return { success: "Password changed." };
}

/**
 * Starts an email change. Re-authenticates with the current password, then asks
 * Supabase to email a confirmation link to the new address. The email only
 * changes once the user confirms; a DB trigger then syncs profiles.email.
 */
export async function changeEmail(input: ChangeEmailInput): Promise<AccountResult> {
  const parsed = changeEmailSchema.safeParse(input);
  if (!parsed.success) return { error: "Please check the form and try again." };

  const user = await requireUser();
  if (!user.email) return { error: "Your account has no email on file." };
  if (parsed.data.newEmail.toLowerCase() === user.email.toLowerCase()) {
    return { error: "That is already your email." };
  }

  const supabase = await createClient();

  const { error: reauthError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: parsed.data.currentPassword,
  });
  if (reauthError) return { error: "Your current password is incorrect." };

  const origin = await getOrigin();
  const { error } = await supabase.auth.updateUser(
    { email: parsed.data.newEmail },
    { emailRedirectTo: `${origin}/auth/callback?next=/account` },
  );
  if (error) return { error: "Could not start the email change. Please try again." };

  return { success: "Check your new email to confirm the change." };
}
