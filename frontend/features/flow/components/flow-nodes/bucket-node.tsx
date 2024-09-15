import { Cylinder } from "lucide-react";

import { ComboboxNode } from "@/features/flow/components/flow-nodes/combobox-node";
import { NODE_TITLES } from "@/features/flow/constants";
import { useBuckets } from "@/features/flow/hooks/use-buckets";

export const BucketNode = () => {
  const { data } = useBuckets();
  return (
    <ComboboxNode
      title={NODE_TITLES.BUCKET}
      icon={Cylinder}
      selections={data?.buckets}
      rightHandle
      leftHandle={false}
    />
  );
};
