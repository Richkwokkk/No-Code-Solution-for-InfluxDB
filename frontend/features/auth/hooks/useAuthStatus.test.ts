import { useQuery } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { authQueryKeys } from "./queryKeys";
import { useAuthStatus } from "./useAuthStatus";

// Mock dependencies
vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
}));

// Mock sessionStorage
const mockSessionStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};
vi.stubGlobal("sessionStorage", mockSessionStorage);

describe("useAuthStatus", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return isAuthenticated: true when token exists", () => {
    mockSessionStorage.getItem.mockReturnValue("mock-token");
    let capturedQueryFn: () => { isAuthenticated: boolean };

    (useQuery as jest.Mock).mockImplementation(
      ({ queryFn }: { queryFn: () => { isAuthenticated: boolean } }) => {
        capturedQueryFn = queryFn;
        return { data: queryFn() };
      },
    );

    const { result } = renderHook(() => useAuthStatus());

    expect(result.current.data).toEqual({ isAuthenticated: true });
    expect(mockSessionStorage.getItem).toHaveBeenCalledWith("vf-token");
    expect(useQuery).toHaveBeenCalledWith({
      queryKey: authQueryKeys.authStatus,
      queryFn: expect.any(Function),
      staleTime: Infinity,
    });
  });

  it("should return isAuthenticated: false when token doesn't exist", () => {
    mockSessionStorage.getItem.mockReturnValue(null);

    let capturedQueryFn: () => { isAuthenticated: boolean };
    (useQuery as jest.Mock).mockImplementation(
      ({ queryFn }: { queryFn: () => { isAuthenticated: boolean } }) => {
        capturedQueryFn = queryFn;
        return { data: queryFn() };
      },
    );

    const { result } = renderHook(() => useAuthStatus());

    expect(result.current.data).toEqual({ isAuthenticated: false });
    expect(mockSessionStorage.getItem).toHaveBeenCalledWith("vf-token");
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
