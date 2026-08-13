import "server-only";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import type { Profile, UserRole } from "@/types/database";

/**
 * Server-side authentication & authorization helpers.
 *
 * Authorization is enforced here (and in the database via RLS) — never by
 * hiding UI. Any server component, server action, or route handler that
 * performs a privileged operation must call one of these (see docs/SECURITY.md).
 */

/** Returns the authenticated user, or null. Verifies the JWT with Supabase. */
export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/** Returns the current user's profile (id, email, role, ...), or null. */
export async function getProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return data ?? null;
}

/**
 * Requires an authenticated user. Redirects to `/login` (preserving the
 * intended destination) when there is no session. Returns the user.
 */
export async function requireUser(redirectTo?: string) {
  const user = await getUser();
  if (!user) {
    const next = redirectTo ? `?next=${encodeURIComponent(redirectTo)}` : "";
    redirect(`/login${next}`);
  }
  return user;
}

/**
 * Requires an authenticated user whose role is in `roles`. Redirects
 * unauthenticated users to `/login` and authenticated-but-unauthorized users
 * to `/`. Returns the user's profile.
 */
export async function requireRole(roles: UserRole[]): Promise<Profile> {
  const profile = await getProfile();
  if (!profile) redirect("/login");
  if (!roles.includes(profile.role)) redirect("/");
  return profile;
}
