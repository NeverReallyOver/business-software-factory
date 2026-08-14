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
import { updateAppSettings } from "../actions";
import { appSettingsSchema, type AppSettingsInput } from "../schemas";

export function SettingsForm({
  defaultAppName,
  defaultSupportEmail,
}: {
  defaultAppName: string;
  defaultSupportEmail: string;
}) {
  const router = useRouter();
  const [error, setError] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AppSettingsInput>({
    resolver: zodResolver(appSettingsSchema),
    defaultValues: { appName: defaultAppName, supportEmail: defaultSupportEmail },
  });

  async function onSubmit(values: AppSettingsInput) {
    setError(undefined);
    const result = await updateAppSettings(values);
    if (result.error) {
      setError(result.error);
      return;
    }
    toast.success("Settings saved");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <FormStatus error={error} />

      <Field label="App name" htmlFor="appName" error={errors.appName?.message}>
        <Input id="appName" aria-invalid={!!errors.appName} {...register("appName")} />
      </Field>

      <Field
        label="Support email"
        htmlFor="supportEmail"
        error={errors.supportEmail?.message}
      >
        <Input
          id="supportEmail"
          type="email"
          placeholder="support@example.com"
          aria-invalid={!!errors.supportEmail}
          {...register("supportEmail")}
        />
      </Field>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving…" : "Save settings"}
      </Button>
    </form>
  );
}
