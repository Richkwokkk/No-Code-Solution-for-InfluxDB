import { useQuery } from "@tanstack/react-query";

import { ISOStringFormat } from "date-fns";

import { EDITOR_ENDPOINTS, EDITOR_QUERY_KEYS } from "@/features/flow/constants";
import { apiClient } from "@/lib/api-client";

export type GetMeasurementsRequest = {
  bucket: string;
  dateRange: {
    time_start: ISOStringFormat;
    time_stop: ISOStringFormat;
  };
};

export type GetMeasurementsResponse = {
  measurements: string[];
};

export function useMeasurements({ bucket, dateRange }: GetMeasurementsRequest) {
  const org = "ATSYS";
  return useQuery({
    queryKey: [...EDITOR_QUERY_KEYS.MEASUREMENTS, org, bucket, dateRange],
    queryFn: async () => {
      const response = await apiClient.get<GetMeasurementsResponse>(
        EDITOR_ENDPOINTS.getMeasurements({ org: "ATSYS", bucket }),
        { json: dateRange },
      );
      if (!response.ok) {
        throw new Error("Couldn't get measurements");
      }
      return response.json();
    },
  });
}
