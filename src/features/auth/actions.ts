"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import {
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  signupSchema,
  type ForgotPasswordInput,
  type LoginInput,
  type ResetPasswordInput,
  type SignupInput,
} from "@/features/auth/schemas";

/** Result returned to the client. Success paths that redirect return nothing. */
export type AuthResult = { error?: string; success?: string };

/** Absolute origin for building email redirect links. */
async function getOrigin() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return configured.replace(/\/$/, "");
  const h = await headers();
  return `${h.get("x-forwarded-proto") ?? "https"}://${h.get("host")}`;
}

/** Only allow same-origin relative paths as a post-login destination. */
function safeNext(next?: string) {
  return next && next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";
}

export async function signIn(input: LoginInput, next?: string): Promise<AuthResult> {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) return { error: "Invalid email or password." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  // Do not disclose whether the email exists.
  if (error) return { error: "Invalid email or password." };

  redirect(safeNext(next));
}

export async function signUp(input: SignupInput): Promise<AuthResult> {
  const parsed = signupSchema.safeParse(input);
  if (!parsed.success) return { error: "Please check the form and try again." };

  const supabase = await createClient();
  const origin = await getOrigin();
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: { full_name: parsed.data.fullName },
      emailRedirectTo: `${origin}/auth/callback?next=/dashboard`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  // When email confirmation is enabled, there is no active session yet.
  if (!data.session) {
    return { success: "Check your email to confirm your account." };
  }

  redirect("/dashboard");
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function requestPasswordReset(
  input: ForgotPasswordInput,
): Promise<AuthResult> {
  const parsed = forgotPasswordSchema.safeParse(input);
  if (!parsed.success) return { error: "Enter a valid email." };

  const supabase = await createClient();
  const origin = await getOrigin();
  await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${origin}/auth/callback?next=/reset-password`,
  });

  // Always report success — do not reveal whether the email is registered.
  return { success: "If that email exists, a reset link has been sent." };
}

export async function updatePassword(input: ResetPasswordInput): Promise<AuthResult> {
  const parsed = resetPasswordSchema.safeParse(input);
  if (!parsed.success) return { error: "Please check the form and try again." };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Your reset link has expired. Request a new one." };

  const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
  if (error) return { error: error.message };

  redirect("/dashboard");
}
