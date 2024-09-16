import { Grid } from "lucide-react";

import { ComboboxNode } from "@/features/flow/components/flow-nodes/combobox-node";
import { NODE_TITLES } from "@/features/flow/constants";

export const MeasurementNode = () => {
  return (
    <ComboboxNode
      title={NODE_TITLES.MEASUREMENT}
      icon={Grid}
      selections={[
        "measurement-1",
        "measurement-2",
        "measurement-3",
        "measurement-4",
      ]}
    />
  );
};
