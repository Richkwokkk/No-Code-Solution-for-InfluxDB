import { test, expect } from "@playwright/test";

test("should display login form correctly", async ({ page }) => {
  await page.goto("/");

  // Check if the login form elements are present
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  await expect(
    page.getByText("Enter your email below to login to your account"),
  ).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Password")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Forgot your password?" }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  await expect(page.getByText("Don't have an account?")).toBeVisible();
  await expect(page.getByRole("link", { name: "Sign up" })).toBeVisible();
});

test("should fill in login form and submit", async ({ page }) => {
  await page.goto("/");

  // Fill in the form
  await page.getByLabel("Email").fill("test@example.com");
  await page.getByLabel("Password").fill("password123");

  // Click the login button
  await page.getByRole("button", { name: "Login" }).click();

  // Add assertions here for successful login (e.g., redirect, success message)
});

test("should navigate to forgot password page", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "Forgot your password?" });
});
