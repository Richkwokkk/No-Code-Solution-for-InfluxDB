import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Page from "./page";

describe("Login Page", () => {
  it("renders the login form", () => {
    render(<Page />);

    expect(
      screen.getByRole("heading", { level: 1, name: /login/i }),
    ).toBeDefined();
    expect(screen.getByLabelText(/email/i)).toBeDefined();
    expect(screen.getByLabelText(/password/i)).toBeDefined();
    expect(screen.getByRole("button", { name: /login/i })).toBeDefined();
  });

  it("displays the forgot password link", () => {
    render(<Page />);

    const forgotPasswordLink = screen.getByRole("link", {
      name: /forgot your password\?/i,
    });
    expect(forgotPasswordLink).toBeDefined();
    expect(forgotPasswordLink).toHaveAttribute("href", "/forgot-password");
  });

  it("displays the sign up link", () => {
    render(<Page />);

    const signUpLink = screen.getByRole("link", { name: /sign up/i });
    expect(signUpLink).toBeDefined();
    expect(signUpLink).toHaveAttribute("href", "#");
  });
});
