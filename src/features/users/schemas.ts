import { z } from "zod";

/** Validation for inviting a new user (client + server). */
export const inviteSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email"),
  role: z.enum(["owner", "admin", "staff", "employee", "customer"]),
});

export type InviteInput = z.infer<typeof inviteSchema>;
