import { mockLogout, mockAuthQueryKeys } from "@/lib/mocks/mockAuthService";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, act } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useLogout } from "./useLogout";

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

vi.mock("@/lib/mocks/mockAuthService", () => ({
  mockLogout: vi.fn(),
  mockAuthQueryKeys: {
    user: ["user"],
  },
}));

describe("useLogout", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("should return a mutation function", () => {
    const { result } = renderHook(() => useLogout(), { wrapper });
    expect(result.current.mutate).toBeDefined();
  });

  it("should call mockLogout when mutate is called", async () => {
    const { result } = renderHook(() => useLogout(), { wrapper });

    await act(async () => {
      result.current.mutate();
    });

    expect(mockLogout).toHaveBeenCalled();
  });

  it("should clear user data and redirect on successful logout", async () => {
    vi.mocked(mockLogout).mockResolvedValue(undefined);

    const { result } = renderHook(() => useLogout(), { wrapper });

    await act(async () => {
      await result.current.mutate();
    });

    expect(queryClient.getQueryData(mockAuthQueryKeys.user)).toBeNull();
    expect(vi.mocked(useRouter().push)).toHaveBeenCalledWith("/login");
  });
});
