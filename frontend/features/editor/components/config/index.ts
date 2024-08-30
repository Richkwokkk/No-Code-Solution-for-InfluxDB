import { DraggableNode } from "../types";
import { Cylinder, Grid2X2, LucideIcon, RectangleEllipsis } from "lucide-react";
export type NodeTypes = 
  | "bucket"
  | "measurement"
  | "field";

export const nodes: Record<NodeTypes, DraggableNode> = {
  bucket: {
    label: 'Bucket',
    title: 'example-bucket',
    icon: Cylinder,
  },
  measurement: {
    label: 'Measurement',
    title: 'example-measurement',
    icon: Grid2X2,
  },
  field: {
    label: 'Field',
    title: 'example-field',
    icon: RectangleEllipsis,
  },

};