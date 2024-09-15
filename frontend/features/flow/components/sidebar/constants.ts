import {
  CalendarIcon,
  Cylinder,
  Grid,
  Hash,
  RectangleEllipsis,
} from "lucide-react";

import { SidebarDraggable } from "@/features/flow/components/sidebar/sidebar-draggable";
import { NODE_TITLES } from "@/features/flow/constants";
import { NodeType } from "@/features/flow/types";

export const NODE_LABELS = {
  SELECTOR: "selector" as const,
  FILTER: "filter" as const,
};

export const sidebarNodes: Record<NodeType, SidebarDraggable> = {
  BUCKET: {
    label: NODE_LABELS.SELECTOR,
    title: NODE_TITLES.BUCKET,
    icon: Cylinder,
  },
  DATE_RANGE: {
    label: NODE_LABELS.FILTER,
    title: NODE_TITLES.DATE_RANGE,
    icon: CalendarIcon,
  },
  MEASUREMENT: {
    label: NODE_LABELS.SELECTOR,
    title: NODE_TITLES.MEASUREMENT,
    icon: Grid,
  },
  FIELD: {
    label: NODE_LABELS.SELECTOR,
    title: NODE_TITLES.FIELD,
    icon: RectangleEllipsis,
  },
  VALUE_THRESHOLD: {
    label: NODE_LABELS.FILTER,
    title: NODE_TITLES.VALUE_THRESHOLD,
    icon: Hash,
  },
};
