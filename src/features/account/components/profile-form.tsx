"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Field } from "@/components/shared/field";
import { FormStatus } from "@/components/shared/form-status";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateProfile } from "../actions";
import { profileSchema, type ProfileInput } from "../schemas";

export function ProfileForm({
  email,
  defaultName,
}: {
  email: string;
  defaultName: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<{ error?: string; success?: string }>({});
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: { fullName: defaultName },
  });

  async function onSubmit(values: ProfileInput) {
    setStatus({});
    const result = await updateProfile(values);
    setStatus(result);
    if (result.success) router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <FormStatus error={status.error} success={status.success} />

      <Field label="Email" htmlFor="email">
        <Input id="email" type="email" value={email} disabled />
      </Field>

      <Field label="Full name" htmlFor="fullName" error={errors.fullName?.message}>
        <Input
          id="fullName"
          autoComplete="name"
          aria-invalid={!!errors.fullName}
          {...register("fullName")}
        />
      </Field>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving…" : "Save changes"}
      </Button>
    </form>
  );
}
