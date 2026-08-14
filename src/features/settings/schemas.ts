import { z } from "zod";

/** Validation for workspace settings (client + server). */
export const appSettingsSchema = z.object({
  appName: z.string().trim().min(1, "App name is required").max(60),
  supportEmail: z
    .string()
    .trim()
    .email("Enter a valid email")
    .max(255)
    .optional()
    .or(z.literal("")),
});

export type AppSettingsInput = z.infer<typeof appSettingsSchema>;
