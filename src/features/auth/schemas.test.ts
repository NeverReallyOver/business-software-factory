import { describe, expect, it } from "vitest";

import {
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  signupSchema,
} from "./schemas";

describe("loginSchema", () => {
  it("accepts a valid email and password", () => {
    expect(loginSchema.safeParse({ email: "a@b.com", password: "x" }).success).toBe(true);
  });

  it("rejects an invalid email", () => {
    expect(loginSchema.safeParse({ email: "nope", password: "x" }).success).toBe(false);
  });

  it("rejects an empty password", () => {
    expect(loginSchema.safeParse({ email: "a@b.com", password: "" }).success).toBe(false);
  });
});

describe("signupSchema", () => {
  const base = {
    fullName: "Ada Lovelace",
    email: "ada@example.com",
    password: "supersecret",
    confirmPassword: "supersecret",
  };

  it("accepts matching passwords", () => {
    expect(signupSchema.safeParse(base).success).toBe(true);
  });

  it("rejects mismatched passwords on confirmPassword", () => {
    const result = signupSchema.safeParse({ ...base, confirmPassword: "different" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.path).toEqual(["confirmPassword"]);
    }
  });

  it("rejects a password shorter than 8 characters", () => {
    const result = signupSchema.safeParse({ ...base, password: "short", confirmPassword: "short" });
    expect(result.success).toBe(false);
  });

  it("rejects a too-short name", () => {
    expect(signupSchema.safeParse({ ...base, fullName: "A" }).success).toBe(false);
  });
});

describe("forgotPasswordSchema", () => {
  it("requires a valid email", () => {
    expect(forgotPasswordSchema.safeParse({ email: "a@b.com" }).success).toBe(true);
    expect(forgotPasswordSchema.safeParse({ email: "" }).success).toBe(false);
  });
});

describe("resetPasswordSchema", () => {
  it("requires matching passwords of sufficient length", () => {
    expect(
      resetPasswordSchema.safeParse({ password: "supersecret", confirmPassword: "supersecret" })
        .success,
    ).toBe(true);
    expect(
      resetPasswordSchema.safeParse({ password: "supersecret", confirmPassword: "nope" }).success,
    ).toBe(false);
  });
});
