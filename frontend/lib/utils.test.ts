import bcrypt from "bcryptjs";
import { describe, it, expect } from "vitest";
import { cn, saltAndHashPassword } from "./utils";

describe("cn function", () => {
  it("should merge class names correctly", () => {
    const result = cn("class1", "class2", { class3: true, class4: false });
    expect(result).toContain("class1");
    expect(result).toContain("class2");
    expect(result).toContain("class3");
    expect(result).not.toContain("class4");
  });
});

describe("saltAndHashPassword function", () => {
  it("should return a hashed password", async () => {
    const password = "testPassword123";
    const hashedPassword = await saltAndHashPassword(password);

    expect(hashedPassword).not.toBe(password);
    expect(hashedPassword.length).toBeGreaterThan(password.length);
  });

  it("should generate different hashes for the same password", async () => {
    const password = "testPassword123";
    const hash1 = await saltAndHashPassword(password);
    const hash2 = await saltAndHashPassword(password);

    expect(hash1).not.toBe(hash2);
  });

  it("should generate a hash that can be verified with bcrypt", async () => {
    const password = "testPassword123";
    const hashedPassword = await saltAndHashPassword(password);

    const isMatch = await bcrypt.compare(password, hashedPassword);
    expect(isMatch).toBe(true);
  });
});
