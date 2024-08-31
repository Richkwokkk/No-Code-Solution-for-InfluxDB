import { cn } from "@/lib/utils";
import { describe, it, expect } from "vitest";

describe("cn function", () => {
  it("should merge class names correctly", () => {
    const result = cn("class1", "class2", { class3: true, class4: false });
    expect(result).toContain("class1");
    expect(result).toContain("class2");
    expect(result).toContain("class3");
    expect(result).not.toContain("class4");
  });
});
