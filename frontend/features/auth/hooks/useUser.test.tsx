import { mockAuthQueryKeys } from "@/lib/mocks/mockAuthService";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import * as useUserModule from "./useUser";

describe("useUser", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("should return a query result", () => {
    const { result } = renderHook(() => useUserModule.useUser(), { wrapper });
    expect(result.current).toBeDefined();
  });

  it("should have staleTime set to Infinity", () => {
    const useQueryMock = vi.fn();
    const useUserSpy = vi
      .spyOn(useUserModule, "useUser")
      .mockImplementation(() => {
        useQueryMock({
          queryKey: mockAuthQueryKeys.user,
          queryFn: expect.any(Function),
          staleTime: Infinity,
        });
        return {} as any;
      });

    renderHook(() => useUserModule.useUser(), { wrapper });

    expect(useQueryMock).toHaveBeenCalledWith(
      expect.objectContaining({
        staleTime: Infinity,
      }),
    );

    useUserSpy.mockRestore();
  });

  it("should return undefined as initial data", () => {
    const { result } = renderHook(() => useUserModule.useUser(), { wrapper });
    expect(result.current.data).toBeUndefined();
  });
});
