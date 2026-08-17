import { z } from "zod";

/** Validation for self-service account settings (client + server). */

export const profileSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your name").max(120),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Enter your current password"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(72, "Password must be at most 72 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: "Choose a password different from your current one",
    path: ["newPassword"],
  });

export const changeEmailSchema = z.object({
  newEmail: z.string().trim().min(1, "Email is required").email("Enter a valid email"),
  currentPassword: z.string().min(1, "Enter your current password"),
});

export type ProfileInput = z.infer<typeof profileSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type ChangeEmailInput = z.infer<typeof changeEmailSchema>;
