import { LayoutDashboard, Users, type LucideIcon } from "lucide-react";

import type { UserRole } from "@/types/database";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  /** If set, only these roles see the item. Omit to show for everyone. */
  roles?: UserRole[];
}

/**
 * Primary dashboard navigation. Reusable base — customer projects append their
 * own feature items to this array.
 */
export const navItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Users", href: "/users", icon: Users, roles: ["owner", "admin"] },
];

/** Filters nav items by the current user's role. */
export function navItemsForRole(role: UserRole): NavItem[] {
  return navItems.filter((item) => !item.roles || item.roles.includes(role));
}
