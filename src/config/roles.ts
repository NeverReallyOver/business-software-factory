import type { UserRole } from "@/types/database";

/** All roles, ordered from most to least privileged. */
export const USER_ROLES: UserRole[] = [
  "owner",
  "admin",
  "staff",
  "employee",
  "customer",
];

const ROLE_LABELS: Record<UserRole, string> = {
  owner: "Owner",
  admin: "Admin",
  staff: "Staff",
  employee: "Employee",
  customer: "Customer",
};

export function roleLabel(role: UserRole): string {
  return ROLE_LABELS[role];
}
