import type { UserRole } from "@/types/database";

export interface RoleChange {
  actorId: string;
  actorRole: UserRole;
  targetId: string;
  targetRole: UserRole;
  newRole: UserRole;
}

/**
 * Business rules for changing a user's role. Returns an error message when the
 * change is not permitted, or `null` when it is allowed. Pure and unit-tested;
 * the server action enforces this and the database mirrors it via RLS.
 */
export function roleChangeError(change: RoleChange): string | null {
  const { actorId, actorRole, targetId, targetRole, newRole } = change;

  if (actorRole !== "owner" && actorRole !== "admin") {
    return "You are not allowed to change roles.";
  }

  if (actorId === targetId) {
    return "You cannot change your own role.";
  }

  // Only an owner may touch (or grant) the owner role.
  if (actorRole === "admin" && (targetRole === "owner" || newRole === "owner")) {
    return "Only an owner can manage the owner role.";
  }

  return null;
}
