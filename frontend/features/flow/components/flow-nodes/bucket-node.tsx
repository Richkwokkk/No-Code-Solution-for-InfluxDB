import { useReactFlow } from "@xyflow/react";

import { Cylinder } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

import { ComboboxNode } from "@/features/flow/components/flow-nodes/combobox-node";
import { NodeProps } from "@/features/flow/components/flow-nodes/types";
import { NODE_TITLES } from "@/features/flow/components/sidebar/constants";
import { useBuckets } from "@/features/flow/hooks/use-buckets";

export const BucketNode = ({ id }: NodeProps) => {
  const { data, error } = useBuckets();
  const router = useRouter();
  const pathname = usePathname();

  const { updateNodeData } = useReactFlow();

  const handleSelectBucket = (bucket: string | undefined) =>
    updateNodeData(id, { value: bucket, result: { bucket } });

  if (error) {
    localStorage.removeItem("vf-token");
    if (pathname !== "/login") {
      router.push("/login");
      toast.error("Session expired. Please login again.");
    }
  }

  return (
    <ComboboxNode
      id={id}
      title={NODE_TITLES.BUCKET}
      icon={Cylinder}
      selections={data?.buckets}
      underHandle
      underHandleId="BUCKET"
      onSelectNodeOption={handleSelectBucket}
      isPreviousNodeValueChanged={false}
    />
  );
};
