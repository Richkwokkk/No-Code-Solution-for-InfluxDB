import React from "react";

import {
  useHandleConnections,
  useNodesData,
  useReactFlow,
} from "@xyflow/react";

import { Grid } from "lucide-react";
import { toast } from "sonner";

import { ComboboxNode } from "@/features/flow/components/flow-nodes/combobox-node";
import {
  NodeData,
  NodeProps,
  NodeType,
} from "@/features/flow/components/flow-nodes/types";
import { NODE_TITLES } from "@/features/flow/components/sidebar/constants";
import { useMeasurements } from "@/features/flow/hooks/use-measurements";

export const MeasurementNode = ({ id }: NodeProps) => {
  const { updateNodeData } = useReactFlow();
  const dateRangeConnections = useHandleConnections({
    type: "target",
    id: "DATE_RANGE" as NodeType,
  });
  const dateRangeNodeData = useNodesData(dateRangeConnections?.[0]?.source);

  const previousNodeData = React.useMemo(
    () => (dateRangeNodeData?.data.result as NodeData["result"]) || null,
    [dateRangeNodeData],
  );

  const { data, error } = useMeasurements(previousNodeData);

  if (error) {
    toast.error(error?.message);
  }

  const handleSelectMeasurement = (measurement: string | undefined) => {
    updateNodeData(id, {
      value: measurement,
      result: { ...previousNodeData, measurement, field: undefined },
    });
  };

  const [isPreviousNodeValueChanged, setIsPreviousNodeValueChanged] =
    React.useState(false);
  const previousBucketRef = React.useRef(previousNodeData?.bucket);

  React.useEffect(() => {
    if (previousNodeData?.bucket !== previousBucketRef.current) {
      previousBucketRef.current = previousNodeData?.bucket;
      setIsPreviousNodeValueChanged(true);
    }
  }, [previousNodeData]);

  React.useEffect(() => {
    if (isPreviousNodeValueChanged) {
      setIsPreviousNodeValueChanged(false);
    }
  }, [isPreviousNodeValueChanged]);

  return (
    <ComboboxNode
      id={id}
      title={NODE_TITLES.MEASUREMENT}
      icon={Grid}
      selections={data?.measurements}
      upHandleId="DATE_RANGE"
      underHandleId="MEASUREMENT"
      upHandle
      underHandle
      onSelectNodeOption={handleSelectMeasurement}
      isPreviousNodeValueChanged={isPreviousNodeValueChanged}
    />
  );
};
