import { test, expect } from "@playwright/test";

test.describe("Login Form", () => {
  test("should display login form correctly", async ({ page }) => {
    await page.goto("/login");

    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
    await expect(page.getByText("Enter your username below")).toBeVisible();
    await expect(page.getByLabel("Username")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  });

  test("should show validation errors for empty fields", async ({ page }) => {
    await page.goto("/login");

    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Username is required")).toBeVisible();
    await expect(page.getByText("Password is required")).toBeVisible();
  });

  test("should show validation error for short password", async ({ page }) => {
    await page.goto("/login");

    await page.getByLabel("Username").fill("testuser");
    await page.getByLabel("Password").fill("short");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(
      page.getByText("Password must be at least 8 characters"),
    ).toBeVisible();
  });

  test("should submit form with valid data", async ({ page }) => {
    await page.goto("/login");

    await page.getByLabel("Username").fill("testuser");
    await page.getByLabel("Password").fill("validpassword123");

    const loginButton = page.getByRole("button", { name: "Login" });
    await loginButton.click();

    await page.waitForFunction(
      (selector) =>
        document.querySelector(selector)?.innerHTML === "Logging in...",
      "button",
    );

    // Wait for the login process to complete (adjust timeout as needed)
    await page.waitForTimeout(1500);

    // Add assertions for successful login (e.g., redirect, success message)
    // This will depend on your application's behavior after successful login
  });
});
