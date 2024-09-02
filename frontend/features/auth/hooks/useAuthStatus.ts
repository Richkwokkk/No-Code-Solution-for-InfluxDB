import { useQuery } from "@tanstack/react-query";
import { authQueryKeys } from "./queryKeys";

export function useAuthStatus() {
  return useQuery({
    queryKey: authQueryKeys.authStatus,
    queryFn: () => {
      const token = sessionStorage.getItem("vf-token");
      if (!token) {
        return { isAuthenticated: false };
      }
      return { isAuthenticated: true };
    },
    staleTime: Infinity,
  });
}
