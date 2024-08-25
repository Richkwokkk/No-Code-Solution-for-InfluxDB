import { mockLogin, mockAuthQueryKeys } from "@/lib/mocks/mockAuthService";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useLogin } from "./useLogin";

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

vi.mock("@/lib/mocks/mockAuthService", () => ({
  mockLogin: vi.fn(),
  mockAuthQueryKeys: {
    user: ["user"],
  },
}));

describe("useLogin", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("should return a mutation function", () => {
    const { result } = renderHook(() => useLogin(), { wrapper });
    expect(result.current.mutate).toBeDefined();
  });

  it("should call mockLogin with the provided data", async () => {
    const { result } = renderHook(() => useLogin(), { wrapper });
    const loginData = { username: "testuser", password: "password" };

    await act(async () => {
      result.current.mutate(loginData);
    });

    expect(mockLogin).toHaveBeenCalledWith(loginData);
  });

  it("should update query data and redirect on successful login", async () => {
    const user = { id: "1", username: "testuser" };
    vi.mocked(mockLogin).mockResolvedValue(user);

    const { result } = renderHook(() => useLogin(), { wrapper });

    await act(async () => {
      await result.current.mutate({
        username: "testuser",
        password: "password",
      });
    });

    expect(queryClient.getQueryData(mockAuthQueryKeys.user)).toEqual(user);
    expect(vi.mocked(useRouter().push)).toHaveBeenCalledWith("/editor");
  });

  it("should not update query data or redirect on login failure", async () => {
    vi.mocked(mockLogin).mockRejectedValue(new Error("Invalid credentials"));

    const { result } = renderHook(() => useLogin(), { wrapper });

    await act(async () => {
      try {
        await result.current.mutate({
          username: "wronguser",
          password: "wrongpass",
        });
      } catch (error) {
        // Expected error
      }
    });

    expect(queryClient.getQueryData(mockAuthQueryKeys.user)).toBeUndefined();
    expect(vi.mocked(useRouter().push)).not.toHaveBeenCalled();
  });

  it("should set isError to true on login failure", async () => {
    vi.mocked(mockLogin).mockRejectedValue(new Error("Invalid credentials"));

    const { result } = renderHook(() => useLogin(), { wrapper });

    result.current.mutate({ username: "wronguser", password: "wrongpass" });

    await waitFor(
      () => {
        expect(result.current.isError).toBe(true);
      },
      { timeout: 1000 },
    ); // Increase timeout if needed
  });
});
