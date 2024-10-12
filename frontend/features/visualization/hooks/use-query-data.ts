import { useQuery } from "@tanstack/react-query";

import { fluxQueryKeys } from "@/features/code/constants";
import { Row } from "@/features/visualization/types";

export function useQueryData() {
  const { data } = useQuery({
    queryKey: fluxQueryKeys.fluxQuery,
    staleTime: Infinity,
  }) as {
    data: Row[];
  };

  return data;
}
