import { Node } from "@xyflow/react";

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
    data: {},
  },
];

export const NODE_TITLES = {
  BUCKET: "bucket" as const,
  MEASUREMENT: "measurement" as const,
  FIELD: "field" as const,
  VALUE_THRESHOLD: "value threshold" as const,
  DATE_RANGE: "date range" as const,
};

export const EDITOR_QUERY_KEYS = {
  BUCKETS: ["buckets"] as const,
  MEASUREMENTS: ["measurements"] as const,
};
