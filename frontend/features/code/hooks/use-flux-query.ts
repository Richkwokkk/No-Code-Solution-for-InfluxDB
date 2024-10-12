import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { fluxQueryKeys } from "@/features/code/constants";
import { apiClient } from "@/lib/api-client";

export const useFluxQuery = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { result: Record<string, any> } | undefined,
    unknown,
    string
  >({
    mutationFn: async (code: string) => {
      const sanitizedCode = code
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .join(" ")
        .replace(/\s*([|><=(),])\s*/g, "$1");

      if (sanitizedCode === "" || sanitizedCode.includes("/*")) {
        return;
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
    onSuccess: (data: { result: Record<string, any> } | undefined) => {
      if (!data) return;
      queryClient.invalidateQueries({ queryKey: fluxQueryKeys.fluxQuery });
      const labels = {
        co: "carbon",
        hum: "humidity",
        temp: "temperature",
      };
      queryClient.setQueryData(
        fluxQueryKeys.fluxQuery,
        Object.values(data.result)
          .flat()
          .filter((r) => r.result === "_result")
          .map(
            ({
              [""]: _,
              result: _result,
              room,
              table: _table,
              _field: field,
              _measurement: measurement,
              _start: start,
              _stop: stop,
              _time: time,
              _value: value,
            }: {
              result: string;
              table: string;
              _field: string;
              [""]: string;
              room: string;
              _measurement: string;
              _start: string;
              _stop: string;
              _time: string;
              _value: string;
            }) => ({
              time,
              start,
              stop,
              label: labels[field as keyof typeof labels],
              room,
              value: parseFloat(value),
              field,
              measurement,
            }),
          )
          .sort((a, b) => (a as any)._time - (b as any)._time),
      );
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
