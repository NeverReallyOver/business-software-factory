import type { Metadata } from "next";

import { PageHeader } from "@/components/shared/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { requireRole } from "@/features/auth/server";
import { InviteUser } from "@/features/users/components/invite-user";
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

      <Card>
        <CardHeader>
          <CardTitle>Invite a user</CardTitle>
          <CardDescription>
            Send an email invitation with an assigned role.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InviteUser currentUserRole={actor.role} />
        </CardContent>
      </Card>

      <UsersTable
        users={users}
        currentUserId={actor.id}
        currentUserRole={actor.role}
      />
    </div>
  );
}
