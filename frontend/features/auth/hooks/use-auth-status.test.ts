import { useQuery } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";

import { describe, it, expect, vi, beforeEach } from "vitest";

import { authQueryKeys } from "@/features/auth/hooks/constants";
import { useAuthStatus } from "@/features/auth/hooks/use-auth-status";

// Mock dependencies
vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
}));

// Mock sessionStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};
vi.stubGlobal("localStorage", mockLocalStorage);

describe("useAuthStatus", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return isAuthenticated: true when token exists", () => {
    mockLocalStorage.getItem.mockReturnValue("mock-token");

    (useQuery as jest.Mock).mockImplementation(
      ({ queryFn }: { queryFn: () => { isAuthenticated: boolean } }) => {
        return { data: queryFn() };
      },
    );

    const { result } = renderHook(() => useAuthStatus());

    expect(result.current.data).toEqual({ isAuthenticated: true });
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith("vf-token");
    expect(useQuery).toHaveBeenCalledWith({
      queryKey: authQueryKeys.authStatus,
      queryFn: expect.any(Function),
      staleTime: Infinity,
    });
  });

  it("should return isAuthenticated: false when token doesn't exist", () => {
    mockLocalStorage.getItem.mockReturnValue(null);

    (useQuery as jest.Mock).mockImplementation(
      ({ queryFn }: { queryFn: () => { isAuthenticated: boolean } }) => {
        return { data: queryFn() };
      },
    );

    const { result } = renderHook(() => useAuthStatus());

    expect(result.current.data).toEqual({ isAuthenticated: false });
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith("vf-token");
    expect(useQuery).toHaveBeenCalledWith({
      queryKey: authQueryKeys.authStatus,
      queryFn: expect.any(Function),
      staleTime: Infinity,
    });
  });

  it("should use the correct query key", () => {
    renderHook(() => useAuthStatus());

    expect(useQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: authQueryKeys.authStatus,
      }),
    );
  });

  it("should set staleTime to Infinity", () => {
    renderHook(() => useAuthStatus());

    expect(useQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        staleTime: Infinity,
      }),
    );
  });
});
