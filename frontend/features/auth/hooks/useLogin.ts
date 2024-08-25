import { type FormData } from "@/features/auth/components/login-card";
import { mockLogin, mockAuthQueryKeys } from "@/lib/mocks/mockAuthService";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => mockLogin(data),
    onSuccess: (user) => {
      queryClient.setQueryData(mockAuthQueryKeys.user, user);
      console.log("User logged in:", user);
      router.push("/editor");
    },
  });
}
