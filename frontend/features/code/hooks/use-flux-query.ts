import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { fluxQueryKeys } from "@/features/code/constants";
import { useFluxCode } from "@/features/code/hooks/use-flux-code";
import { apiClient } from "@/lib/api-client";

export const useFluxQuery = () => {
  const code = useFluxCode();
  const sanitizedCode = code
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join(" ")
    .replace(/\s*([|><=(),])\s*/g, "$1");

  const queryClient = useQueryClient();

  return useMutation<{ result: Record<string, any> }, unknown, void>({
    mutationFn: () => {
      if (sanitizedCode.includes("/*")) {
        throw new Error("Please complete your query");
      }
      if (!sanitizedCode.includes("range")) {
        throw new Error("Please add a range to your query");
      }
      return apiClient
        .post("influxdb/query?organization=ATSYS", {
          json: { query: sanitizedCode },
        })
        .json();
    },
    onSuccess: (data: { result: Record<string, any> }) => {
      queryClient.invalidateQueries({ queryKey: fluxQueryKeys.fluxQuery });
      queryClient.setQueryData([fluxQueryKeys.fluxQuery, sanitizedCode], {
        data: Object.values(data.result)
          .flat()
          .filter((r) => r.result === "_result")
          .map(
            ({
              [""]: _,
              result: _result,
              table: _table,
              ...rest
            }: {
              result: string;
              table: string;
              [""]: string;
            }) => ({ ...rest }),
          ),
      });
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error("Error querying data", {
          description: error.message,
        });
      } else {
        toast.error("An unknown error occurred");
      }
    },
  });
};
