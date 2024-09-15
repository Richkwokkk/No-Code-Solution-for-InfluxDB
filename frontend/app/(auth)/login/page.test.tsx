import { render, screen } from "@testing-library/react";

import { describe, it, expect, vi } from "vitest";

import LoginPage from "@/app/(auth)/login/page";

// Mock the LoginCard component
vi.mock("@/features/auth/components/login-card", () => ({
  LoginCard: () => <div data-testid="mock-login-card">Mock Login Card</div>,
}));

describe("Login Page", () => {
  it("renders the login page with LoginCard", () => {
    render(<LoginPage />);

    const loginCardElement = screen.getByTestId("mock-login-card");
    expect(loginCardElement).toBeDefined();
  });

  it("has the correct layout and styling", () => {
    render(<LoginPage />);

    const containerDiv = screen.getByTestId("mock-login-card").parentElement;
    expect(containerDiv).toHaveClass(
      "flex h-screen items-center justify-center bg-white py-12",
    );
  });
});
