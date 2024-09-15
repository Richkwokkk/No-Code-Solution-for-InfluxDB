import { useHandleConnections, useNodesData } from "@xyflow/react";

import { Grid } from "lucide-react";
import { toast } from "sonner";

import { ComboboxNode } from "@/features/flow/components/flow-nodes/combobox-node";
import { NODE_TITLES } from "@/features/flow/constants";
import {
  GetMeasurementsRequest,
  useMeasurements,
} from "@/features/flow/hooks/use-measurements";
import { NodeType } from "@/features/flow/types";

export const MeasurementNode = () => {
  const dateRangeConnections = useHandleConnections({
    type: "target",
    id: "DATE_RANGE" as NodeType,
  });
  const dateRangeNodeData = useNodesData(dateRangeConnections?.[0]?.source);

  const { bucket, dateRange } =
    (dateRangeNodeData?.data as GetMeasurementsRequest) || {};
  const { data, error } = useMeasurements({ bucket, dateRange });

  console.log({ bucket, dateRange });
  console.log({ data });

  if (error) {
    toast.error(error?.message);
  }

  return (
    <ComboboxNode
      title={NODE_TITLES.MEASUREMENT}
      icon={Grid}
      selections={data?.measurements}
      leftHandleId="DATE_RANGE"
    />
  );
};
