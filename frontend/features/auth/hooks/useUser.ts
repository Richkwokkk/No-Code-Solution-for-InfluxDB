import { mockAuthQueryKeys } from "@/lib/mocks/mockAuthService";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  return useQuery({
    queryKey: mockAuthQueryKeys.user,
    queryFn: () => null, // We're not fetching here because the data is set by the login mutation
    staleTime: Infinity, // Prevent refetching
  });
}
