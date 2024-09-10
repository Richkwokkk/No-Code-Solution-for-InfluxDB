import { useQuery } from "@tanstack/react-query";

import { authQueryKeys } from "@/features/auth/hooks/queryKeys";

export function useAuthStatus() {
  return useQuery({
    queryKey: authQueryKeys.authStatus,
    queryFn: () => {
      const token = localStorage.getItem("vf-token");
      if (!token) {
        return { isAuthenticated: false };
      }
      return { isAuthenticated: true };
    },
    staleTime: Infinity,
  });
}
