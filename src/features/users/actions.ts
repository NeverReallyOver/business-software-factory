"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { requireRole } from "@/features/auth/server";
import { logEvent } from "@/features/audit/log";
import { createAdminClient, isAdminConfigured } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { roleChangeError } from "./permissions";
import { inviteSchema, type InviteInput } from "./schemas";

async function getOrigin() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return configured.replace(/\/$/, "");
  const h = await headers();
  return `${h.get("x-forwarded-proto") ?? "https"}://${h.get("host")}`;
}

const updateRoleSchema = z.object({
  userId: z.string().uuid(),
  role: z.enum(["owner", "admin", "staff", "employee", "customer"]),
});

/**
 * Changes a user's role. Authorization is enforced here (`requireRole` +
 * business rules) and mirrored in the database via RLS.
 */
export async function updateUserRole(
  userId: string,
  role: string,
): Promise<{ error?: string }> {
  const parsed = updateRoleSchema.safeParse({ userId, role });
  if (!parsed.success) return { error: "Invalid request." };

  const actor = await requireRole(["owner", "admin"]);
  const supabase = await createClient();

  const { data: target } = await supabase
    .from("profiles")
    .select("id, role")
    .eq("id", parsed.data.userId)
    .single();

  if (!target) return { error: "User not found." };

  const error = roleChangeError({
    actorId: actor.id,
    actorRole: actor.role,
    targetId: target.id,
    targetRole: target.role,
    newRole: parsed.data.role,
  });
  if (error) return { error };

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ role: parsed.data.role })
    .eq("id", parsed.data.userId);

  if (updateError) return { error: "Could not update the role. Please try again." };

  await logEvent("user.role_changed", {
    targetType: "user",
    targetId: parsed.data.userId,
    metadata: { from: target.role, to: parsed.data.role },
  });

  revalidatePath("/users");
  return {};
}

/**
 * Invites a new user by email with a role. Owner/admin only; admins may not
 * invite owners. The role is recorded in `user_invites` (server-only) and
 * applied by the signup trigger — signup metadata is never trusted for role.
 */
export async function inviteUser(input: InviteInput): Promise<{ error?: string }> {
  const parsed = inviteSchema.safeParse(input);
  if (!parsed.success) return { error: "Invalid request." };

  const actor = await requireRole(["owner", "admin"]);
  if (actor.role === "admin" && parsed.data.role === "owner") {
    return { error: "Only an owner can invite an owner." };
  }

  if (!isAdminConfigured()) {
    return { error: "Invites are not configured on the server." };
  }

  const admin = createAdminClient();

  // Record the intended role BEFORE creating the user, so the signup trigger
  // (which fires on invite) can read and apply it.
  const { error: inviteError } = await admin
    .from("user_invites")
    .upsert({ email: parsed.data.email, role: parsed.data.role, invited_by: actor.id });
  if (inviteError) return { error: "Could not create the invite." };

  const origin = await getOrigin();
  const { error } = await admin.auth.admin.inviteUserByEmail(parsed.data.email, {
    redirectTo: `${origin}/auth/callback?next=/reset-password`,
  });

  if (error) {
    // Roll back the pending invite; do not reveal whether the email exists.
    await admin.from("user_invites").delete().eq("email", parsed.data.email);
    return { error: "Could not send the invite. The email may already be registered." };
  }

  await logEvent("user.invited", {
    targetType: "user",
    targetId: parsed.data.email,
    metadata: { role: parsed.data.role },
  });

  revalidatePath("/users");
  return {};
}
