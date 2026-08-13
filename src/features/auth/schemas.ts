import { z } from "zod";

/**
 * Validation schemas for authentication. Used on both the client (React Hook
 * Form) and the server (server actions) — never trust the client alone
 * (see docs/SECURITY.md).
 */

const email = z.string().trim().min(1, "Email is required").email("Enter a valid email");

const password = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(72, "Password must be at most 72 characters");

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "Password is required"),
});

export const signupSchema = z
  .object({
    fullName: z.string().trim().min(2, "Enter your name").max(120),
    email,
    password,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({ email });

export const resetPasswordSchema = z
  .object({
    password,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
