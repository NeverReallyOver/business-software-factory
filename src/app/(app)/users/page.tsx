import type { Metadata } from "next";

import { PageHeader } from "@/components/shared/page-header";
import { requireRole } from "@/features/auth/server";
import { UsersTable } from "@/features/users/components/users-table";
import { listProfiles } from "@/features/users/queries";

export const metadata: Metadata = { title: "Users" };

export default async function UsersPage() {
  const actor = await requireRole(["owner", "admin"]);
  const users = await listProfiles();

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <PageHeader
        title="Users"
        description="Manage the people who can access this workspace and their roles."
      />
      <UsersTable
        users={users}
        currentUserId={actor.id}
        currentUserRole={actor.role}
      />
    </div>
  );
}
