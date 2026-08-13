"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { DataTable, type Column } from "@/components/shared/data-table";
import { USER_ROLES, roleLabel } from "@/config/roles";
import { cn } from "@/lib/utils";
import type { Profile, UserRole } from "@/types/database";
import { updateUserRole } from "../actions";

interface PendingChange {
  user: Profile;
  newRole: UserRole;
}

export function UsersTable({
  users,
  currentUserId,
  currentUserRole,
}: {
  users: Profile[];
  currentUserId: string;
  currentUserRole: UserRole;
}) {
  const router = useRouter();
  const [pending, setPending] = useState<PendingChange | null>(null);
  const [error, setError] = useState<string>();
  const [isSaving, startTransition] = useTransition();

  const canEdit = (target: Profile) => {
    if (target.id === currentUserId) return false;
    if (currentUserRole === "admin" && target.role === "owner") return false;
    return true;
  };

  // Admins cannot assign the owner role, but keep it visible on owner rows.
  const roleOptions = (target: Profile) =>
    USER_ROLES.filter(
      (role) => currentUserRole === "owner" || role !== "owner" || role === target.role,
    );

  function confirmChange() {
    if (!pending) return;
    const change = pending;
    startTransition(async () => {
      const result = await updateUserRole(change.user.id, change.newRole);
      setPending(null);
      if (result.error) {
        setError(result.error);
        return;
      }
      setError(undefined);
      router.refresh();
    });
  }

  const columns: Column<Profile>[] = [
    { key: "name", header: "Name", cell: (u) => u.full_name ?? "—" },
    { key: "email", header: "Email", cell: (u) => u.email },
    { key: "role", header: "Role", cell: (u) => <RoleBadge role={u.role} /> },
    {
      key: "joined",
      header: "Joined",
      cell: (u) => new Date(u.created_at).toLocaleDateString(),
    },
    {
      key: "actions",
      header: <span className="sr-only">Change role</span>,
      headerClassName: "w-44",
      cell: (u) => (
        <select
          aria-label={`Change role for ${u.email}`}
          value={u.role}
          disabled={!canEdit(u) || isSaving}
          onChange={(e) =>
            setPending({ user: u, newRole: e.target.value as UserRole })
          }
          className="h-8 w-full rounded-lg border border-input bg-transparent px-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 dark:bg-input/30"
        >
          {roleOptions(u).map((role) => (
            <option key={role} value={role}>
              {roleLabel(role)}
            </option>
          ))}
        </select>
      ),
    },
  ];

  return (
    <div className="space-y-3">
      {error ? (
        <p
          role="alert"
          className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {error}
        </p>
      ) : null}

      <DataTable columns={columns} data={users} getRowKey={(u) => u.id} />

      <ConfirmDialog
        open={pending !== null}
        onOpenChange={(open) => {
          if (!open) setPending(null);
        }}
        title="Change role"
        description={
          pending
            ? `Change ${pending.user.email} from ${roleLabel(
                pending.user.role,
              )} to ${roleLabel(pending.newRole)}?`
            : undefined
        }
        confirmLabel="Change role"
        loading={isSaving}
        onConfirm={confirmChange}
      />
    </div>
  );
}

function RoleBadge({ role }: { role: UserRole }) {
  const emphasized = role === "owner" || role === "admin";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
        emphasized
          ? "bg-primary/10 text-primary"
          : "bg-muted text-muted-foreground",
      )}
    >
      {roleLabel(role)}
    </span>
  );
}
