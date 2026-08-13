"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { requireRole } from "@/features/auth/server";
import { createClient } from "@/lib/supabase/server";
import { roleChangeError } from "./permissions";

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

  revalidatePath("/users");
  return {};
}
