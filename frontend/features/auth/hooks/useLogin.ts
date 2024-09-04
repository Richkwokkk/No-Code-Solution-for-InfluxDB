import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

import { type FormData } from "@/features/auth/components/login-card";
import { authQueryKeys } from "@/features/auth/hooks/queryKeys";
import { apiClient } from "@/lib/api-client";

export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) =>
      apiClient.post("accounts/signin/", { json: data }).json(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authQueryKeys.authStatus });
      queryClient.setQueryData(authQueryKeys.authStatus, {
        isAuthenticated: true,
      });
      localStorage.setItem("vf-token", btoa(Date.now().toString()));
      router.push("/editor");
    },
    onError: () => {
      localStorage.removeItem("vf-token");
    },
  });
}
