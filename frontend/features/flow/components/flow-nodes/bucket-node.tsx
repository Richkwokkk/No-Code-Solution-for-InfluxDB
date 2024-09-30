import { useReactFlow } from "@xyflow/react";

import { Cylinder } from "lucide-react";

import { ComboboxNode } from "@/features/flow/components/flow-nodes/combobox-node";
import { NODE_TITLES } from "@/features/flow/components/sidebar/constants";
import { useBuckets } from "@/features/flow/hooks/use-buckets";

export type BucketNodeProps = { id: string };

export const BucketNode = ({ id }: BucketNodeProps) => {
  const { data } = useBuckets();
  const { updateNodeData } = useReactFlow();

  const handleSelectBucket = (bucket: string) => updateNodeData(id, { bucket });

  return (
    <ComboboxNode
      title={NODE_TITLES.BUCKET}
      icon={Cylinder}
      selections={data?.buckets}
      rightHandle
      rightHandleId="BUCKET"
      leftHandle={false}
      onSelectNodeOption={handleSelectBucket}
    />
  );
};
