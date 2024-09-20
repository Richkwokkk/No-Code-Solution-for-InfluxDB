import { Node } from "@xyflow/react";

import { Cylinder } from "lucide-react";

import {
  NODE_LABELS,
  NODE_TITLES,
} from "@/features/flow/components/sidebar/constants";
import { NodeType } from "@/features/flow/types";

export const FLOW_KEY = "influx-flow";

const EDITOR_API_PATH = "influxdb";

export const EDITOR_ENDPOINTS = {
  getBuckets: `${EDITOR_API_PATH}/buckets` as const,
};

export const initialNodes: Node[] = [
  {
    id: "BUCKET" as NodeType,
    type: "BUCKET" as NodeType,
    deletable: false,
    position: {
      x: 400,
      y: 300,
    },
    data: {
      label: NODE_LABELS.SELECTOR,
      title: NODE_TITLES.BUCKET,
      icon: Cylinder,
    },
  },
];

export const EDITOR_QUERY_KEYS = {
  BUCKETS: ["buckets"] as const,
  MEASUREMENTS: ["measurements"] as const,
};
