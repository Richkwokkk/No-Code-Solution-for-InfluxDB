import { Cylinder, Grid, RectangleEllipsis } from "lucide-react";

import { type SidebarDraggable } from "@/features/editor/components/sidebar-draggable";

export type NodeTypes = "bucket" | "measurement" | "field";

export const nodes: Record<NodeTypes, SidebarDraggable> = {
  bucket: {
    label: "Selector",
    title: "Bucket",
    icon: Cylinder,
  },
  measurement: {
    label: "Selector",
    title: "Measurement",
    icon: Grid,
  },
  field: {
    label: "Selector",
    title: "Field",
    icon: RectangleEllipsis,
  },
};
