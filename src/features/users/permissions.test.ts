import { describe, expect, it } from "vitest";

import { roleChangeError } from "./permissions";

const base = {
  actorId: "actor",
  actorRole: "owner" as const,
  targetId: "target",
  targetRole: "customer" as const,
  newRole: "staff" as const,
};

describe("roleChangeError", () => {
  it("allows an owner to change another user's role", () => {
    expect(roleChangeError(base)).toBeNull();
  });

  it("allows an admin to change a non-owner to a non-owner role", () => {
    expect(roleChangeError({ ...base, actorRole: "admin" })).toBeNull();
  });

  it("rejects non-privileged actors", () => {
    expect(roleChangeError({ ...base, actorRole: "staff" })).toMatch(/not allowed/i);
    expect(roleChangeError({ ...base, actorRole: "customer" })).toMatch(/not allowed/i);
  });

  it("rejects changing your own role", () => {
    expect(
      roleChangeError({ ...base, targetId: "actor" }),
    ).toMatch(/your own role/i);
  });

  it("stops an admin from granting the owner role", () => {
    expect(
      roleChangeError({ ...base, actorRole: "admin", newRole: "owner" }),
    ).toMatch(/only an owner/i);
  });

  it("stops an admin from modifying an existing owner", () => {
    expect(
      roleChangeError({ ...base, actorRole: "admin", targetRole: "owner", newRole: "admin" }),
    ).toMatch(/only an owner/i);
  });

  it("allows an owner to grant the owner role", () => {
    expect(roleChangeError({ ...base, newRole: "owner" })).toBeNull();
  });
});
