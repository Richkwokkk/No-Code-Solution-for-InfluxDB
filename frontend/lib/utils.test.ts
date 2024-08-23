import { describe, it, expect } from "vitest";
import { capitalizeFirstLetter } from "./utils";

describe("capitalizeFirstLetter", () => {
  it("capitalizes the first letter of a string", () => {
    expect(capitalizeFirstLetter("hello")).toBe("Hello");
    expect(capitalizeFirstLetter("world")).toBe("World");
  });

  it("returns an empty string if input is empty", () => {
    expect(capitalizeFirstLetter("")).toBe("");
  });

  it("does not change already capitalized strings", () => {
    expect(capitalizeFirstLetter("Hello")).toBe("Hello");
  });
});
