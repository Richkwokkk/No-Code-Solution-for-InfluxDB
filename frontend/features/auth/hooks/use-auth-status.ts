import { useQuery, useQueryClient } from "@tanstack/react-query";

import { authQueryKeys } from "@/features/auth/hooks/constants";

export function useAuthStatus() {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: authQueryKeys.authStatus,
    queryFn: () => {
      return queryClient.getQueryData<{ isAuthenticated: boolean }>(
        authQueryKeys.authStatus,
      );
    },
    staleTime: Infinity,
  });
}
