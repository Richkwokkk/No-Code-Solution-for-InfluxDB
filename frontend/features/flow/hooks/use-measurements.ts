import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { NodeData } from "@/features/flow/components/flow-nodes";
import { EDITOR_ENDPOINTS, EDITOR_QUERY_KEYS } from "@/features/flow/constants";
import { apiClient } from "@/lib/api-client";

export type GetMeasurementsResponse = {
  measurements: string[] | undefined;
};

export function useMeasurements({
  bucket,
  timeStart,
  timeStop,
}: NodeData["result"]): UseQueryResult<GetMeasurementsResponse, Error> {
  const org = "ATSYS";
  return useQuery({
    queryKey: [
      ...EDITOR_QUERY_KEYS.MEASUREMENTS,
      org,
      bucket,
      timeStart,
      timeStop,
    ],
    queryFn: async () => {
      if (!bucket || !timeStart || !timeStop) return [];

      const response = await apiClient.get<GetMeasurementsResponse>(
        `${EDITOR_ENDPOINTS.getMeasurements}?bucket=${bucket}&organization=${org}&time-start=${timeStart}&time-stop=${timeStop}`,
      );

      if (!response.ok) {
        throw new Error("Couldn't get measurements");
      }

      return response.json();
    },
  });
}
