import { RectangleEllipsis } from "lucide-react";

import { ComboboxNode } from "@/features/flow/components/flow-nodes/combobox-node";
import { NODE_TITLES } from "@/features/flow/constants";

export const FieldNode = () => {
  return (
    <ComboboxNode
      title={NODE_TITLES.FIELD}
      icon={RectangleEllipsis}
      selections={["field-1", "field-2", "field-3", "field-4"]}
    />
  );
};
