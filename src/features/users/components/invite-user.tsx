"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Field } from "@/components/shared/field";
import { FormStatus } from "@/components/shared/form-status";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { USER_ROLES, roleLabel } from "@/config/roles";
import type { UserRole } from "@/types/database";
import { inviteUser } from "../actions";
import { inviteSchema, type InviteInput } from "../schemas";

export function InviteUser({ currentUserRole }: { currentUserRole: UserRole }) {
  const router = useRouter();
  const [error, setError] = useState<string>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InviteInput>({
    resolver: zodResolver(inviteSchema),
    defaultValues: { role: "customer" },
  });

  // Admins cannot invite owners.
  const roleOptions =
    currentUserRole === "owner"
      ? USER_ROLES
      : USER_ROLES.filter((role) => role !== "owner");

  async function onSubmit(values: InviteInput) {
    setError(undefined);
    const result = await inviteUser(values);
    if (result.error) {
      setError(result.error);
      return;
    }
    toast.success(`Invitation sent to ${values.email}`);
    reset({ email: "", role: "customer" });
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
      <FormStatus error={error} />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Field label="Email" htmlFor="inviteEmail" error={errors.email?.message}>
            <Input
              id="inviteEmail"
              type="email"
              placeholder="person@example.com"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
          </Field>
        </div>
        <div className="sm:w-44">
          <Field label="Role" htmlFor="inviteRole" error={errors.role?.message}>
            <select
              id="inviteRole"
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 dark:bg-input/30"
              {...register("role")}
            >
              {roleOptions.map((role) => (
                <option key={role} value={role}>
                  {roleLabel(role)}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending…" : "Invite"}
        </Button>
      </div>
    </form>
  );
}
