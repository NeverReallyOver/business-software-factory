import type { ReactNode } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { navItemsForRole } from "@/config/navigation";
import { signOut } from "@/features/auth/actions";
import { requireUser, getProfile } from "@/features/auth/server";
import { MobileNav } from "@/features/dashboard/components/mobile-nav";
import { SidebarNav } from "@/features/dashboard/components/sidebar-nav";
import { getAppSettings } from "@/features/settings/queries";

/**
 * Authenticated application shell: responsive sidebar + header. Enforces auth
 * server-side (defense in depth beyond middleware). Every dashboard page renders
 * inside this layout.
 */
export default async function AppLayout({ children }: { children: ReactNode }) {
  await requireUser();
  const profile = await getProfile();
  const settings = await getAppSettings();
  const appName = settings.app_name;
  const items = navItemsForRole(profile?.role ?? "customer");

  return (
    <div className="flex min-h-full flex-1">
      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col gap-4 border-r border-sidebar-border bg-sidebar p-4 text-sidebar-foreground md:flex">
        <Link href="/dashboard" className="font-heading px-3 text-sm font-semibold">
          {appName}
        </Link>
        <SidebarNav items={items} />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center gap-3 border-b px-4">
          <MobileNav items={items} appName={appName} />
          <span className="font-heading text-sm font-semibold md:hidden">
            {appName}
          </span>

          <div className="ml-auto flex items-center gap-3">
            <Link
              href="/account"
              className="hidden rounded-md px-2 py-1 text-right hover:bg-muted sm:block"
            >
              <span className="block text-sm leading-tight">{profile?.email}</span>
              <span className="block text-xs capitalize leading-tight text-muted-foreground">
                {profile?.role}
              </span>
            </Link>
            <form action={signOut}>
              <Button type="submit" variant="outline" size="sm">
                Sign out
              </Button>
            </form>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
