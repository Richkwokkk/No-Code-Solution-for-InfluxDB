import { test, expect } from "@playwright/test";

test.describe("Login Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("should display login form correctly", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
    await expect(page.getByText("Enter your username below")).toBeVisible();
    await expect(page.getByLabel("Username")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  });

  test("should show validation errors for empty fields", async ({ page }) => {
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Username is required")).toBeVisible();
    await expect(page.getByText("Password is required")).toBeVisible();

    await expect(page.getByLabel("Username")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    await expect(page.getByLabel("Password")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  test("should clear validation errors on input focus", async ({ page }) => {
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByText("Username is required")).toBeVisible();

    await page.getByLabel("Username").fill("a");
    await expect(page.getByText("Username is required")).not.toBeVisible();
  });

  test("should submit form with valid data", async ({ page }) => {
    await page.getByLabel("Username").fill("testuser");
    await page.getByLabel("Password").fill("validpassword");

    await page.getByRole("button", { name: "Login" }).click();

    await expect(
      page.getByRole("button", { name: "Logging in..." }),
    ).toBeVisible();

    await page.waitForTimeout(1500);

    // Add assertions for successful login (e.g., redirect, success message)
    // This will depend on your application's behavior after successful login
    // For example:
    // await expect(page).toHaveURL("/dashboard");
  });

  test("should show error message on login failure", async ({ page }) => {
    // Assuming invalid credentials
    await page.getByLabel("Username").fill("invaliduser");
    await page.getByLabel("Password").fill("invalidpassword");

    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Invalid credentials")).toBeVisible();
  });
});
