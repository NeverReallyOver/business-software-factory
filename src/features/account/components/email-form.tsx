"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Field } from "@/components/shared/field";
import { FormStatus } from "@/components/shared/form-status";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { changeEmail } from "../actions";
import { changeEmailSchema, type ChangeEmailInput } from "../schemas";

export function EmailForm({ currentEmail }: { currentEmail: string }) {
  const [status, setStatus] = useState<{ error?: string; success?: string }>({});
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangeEmailInput>({ resolver: zodResolver(changeEmailSchema) });

  async function onSubmit(values: ChangeEmailInput) {
    setStatus({});
    const result = await changeEmail(values);
    setStatus(result);
    if (result.success) reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <FormStatus error={status.error} success={status.success} />

      <Field label="Current email" htmlFor="currentEmail">
        <Input id="currentEmail" type="email" value={currentEmail} disabled />
      </Field>

      <Field label="New email" htmlFor="newEmail" error={errors.newEmail?.message}>
        <Input
          id="newEmail"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.newEmail}
          {...register("newEmail")}
        />
      </Field>

      <Field
        label="Current password"
        htmlFor="emailCurrentPassword"
        error={errors.currentPassword?.message}
      >
        <Input
          id="emailCurrentPassword"
          type="password"
          autoComplete="current-password"
          aria-invalid={!!errors.currentPassword}
          {...register("currentPassword")}
        />
      </Field>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Change email"}
      </Button>
    </form>
  );
}
