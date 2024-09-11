import { type SidebarDraggable } from "@/features/editor/components/sidebar-draggable";
import {
  Cylinder,
  Grid,
  RectangleEllipsis,
  Calendar as CalendarIcon,
} from "lucide-react";

export type NodeTypes = "bucket" | "measurement" | "field" | "date";

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
  date: {
    label: "Filter",
    title: "Date Range",
    icon: CalendarIcon,
  },
};
