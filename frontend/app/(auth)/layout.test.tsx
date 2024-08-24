import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SignInPage from "./login/page";

describe("Login Page", () => {
  it("renders the login form", () => {
    render(<SignInPage />);

    expect(
      screen.getByRole("heading", { level: 3, name: /login/i }),
    ).toBeDefined();
    expect(screen.getByLabelText(/username/i)).toBeDefined();
    expect(screen.getByLabelText(/password/i)).toBeDefined();
    expect(screen.getByRole("button", { name: /login/i })).toBeDefined();
  });
});
