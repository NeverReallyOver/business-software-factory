"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUp } from "@/features/auth/actions";
import { signupSchema, type SignupInput } from "@/features/auth/schemas";
import { Field } from "./field";
import { FormStatus } from "./form-status";

export function SignupForm() {
  const [formError, setFormError] = useState<string>();
  const [formSuccess, setFormSuccess] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({ resolver: zodResolver(signupSchema) });

  async function onSubmit(values: SignupInput) {
    setFormError(undefined);
    setFormSuccess(undefined);
    const result = await signUp(values);
    if (result?.error) setFormError(result.error);
    if (result?.success) setFormSuccess(result.success);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <FormStatus error={formError} success={formSuccess} />

      <Field label="Full name" htmlFor="fullName" error={errors.fullName?.message}>
        <Input
          id="fullName"
          autoComplete="name"
          aria-invalid={!!errors.fullName}
          {...register("fullName")}
        />
      </Field>

      <Field label="Email" htmlFor="email" error={errors.email?.message}>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
      </Field>

      <Field label="Password" htmlFor="password" error={errors.password?.message}>
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          aria-invalid={!!errors.password}
          {...register("password")}
        />
      </Field>

      <Field
        label="Confirm password"
        htmlFor="confirmPassword"
        error={errors.confirmPassword?.message}
      >
        <Input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          aria-invalid={!!errors.confirmPassword}
          {...register("confirmPassword")}
        />
      </Field>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Creating account…" : "Create account"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-foreground hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
