import { QueryClient } from "@tanstack/react-query";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  mockLogin,
  mockLogout,
  mockAuthQueryKeys,
  addMockAuthToQueryClient,
  User,
} from "./mockAuthService";

describe("mockAuthService", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("mockLogin", () => {
    it("should return a user for correct credentials", async () => {
      const loginPromise = mockLogin({
        username: "testuser",
        password: "password",
      });
      vi.runAllTimers();
      const user = await loginPromise;
      expect(user).toEqual({ id: "1", username: "testuser" });
    });

    it("should throw an error for incorrect credentials", async () => {
      const loginPromise = mockLogin({
        username: "wronguser",
        password: "wrongpass",
      });
      vi.runAllTimers();
      await expect(loginPromise).rejects.toThrow("Invalid credentials");
    });

    it("should delay for 1 second", async () => {
      const start = Date.now();
      const loginPromise = mockLogin({
        username: "testuser",
        password: "password",
      });

      vi.advanceTimersToNextTimer();
      await loginPromise;

      const end = Date.now();
      expect(end - start).toBe(1000);
    });
  });

  describe("mockLogout", () => {
    it("should resolve after 500ms", async () => {
      const start = Date.now();
      const logoutPromise = mockLogout();

      vi.advanceTimersToNextTimer();
      await logoutPromise;

      const end = Date.now();
      expect(end - start).toBe(500);
    });
  });

  describe("mockAuthQueryKeys", () => {
    it("should have a user key", () => {
      expect(mockAuthQueryKeys.user).toEqual(["user"]);
    });
  });

  describe("addMockAuthToQueryClient", () => {
    it("should add mock user data to the query client", () => {
      const queryClient = new QueryClient();
      const setQueryDataSpy = vi.spyOn(queryClient, "setQueryData");

      addMockAuthToQueryClient(queryClient);

      expect(setQueryDataSpy).toHaveBeenCalledWith(
        mockAuthQueryKeys.user,
        expect.objectContaining({
          id: "1",
          username: "testuser",
        }),
      );
    });
  });
});
