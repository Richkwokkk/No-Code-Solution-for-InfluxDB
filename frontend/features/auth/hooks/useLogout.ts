import { mockLogout, mockAuthQueryKeys } from "@/lib/mocks/mockAuthService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: mockLogout,
    onSuccess: () => {
      queryClient.setQueryData(mockAuthQueryKeys.user, null);
      router.push("/login");
    },
  });
}
