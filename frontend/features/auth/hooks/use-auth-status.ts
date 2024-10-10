import { useQuery, useQueryClient } from "@tanstack/react-query";

import { authQueryKeys } from "@/features/auth/hooks/constants";

export function useAuthStatus() {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: authQueryKeys.authStatus,
    queryFn: () => {
      const token = queryClient.getQueryData<{ isAuthenticated: boolean }>(
        authQueryKeys.authStatus,
      );
      queryClient.setQueryData(authQueryKeys.authStatus, {
        isAuthenticated: true,
      });
      return token;
    },
    staleTime: Infinity,
  });
}
