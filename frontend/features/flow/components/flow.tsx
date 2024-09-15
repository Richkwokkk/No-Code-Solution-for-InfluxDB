import React, { useCallback } from "react";

import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  BackgroundVariant,
  ConnectionLineType,
  useEdgesState,
  addEdge,
  Connection,
  Node,
  Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { toast } from "sonner";

import { BucketNode } from "@/features/flow/components/flow-nodes/bucket-node";
import { EditorDatePickerNode } from "@/features/flow/components/flow-nodes/date-range-node";
import { FieldNode } from "@/features/flow/components/flow-nodes/field-node";
import { MeasurementNode } from "@/features/flow/components/flow-nodes/measurement-node";
import { ValueThresholdNode } from "@/features/flow/components/flow-nodes/value-threshold-node";
import { NodeType } from "@/features/flow/types";
import { throttle } from "@/lib/utils";

type ReactFlowNodeTypes = { [_t in NodeType]: React.FC };
export const nodeTypes: ReactFlowNodeTypes = {
  BUCKET: BucketNode,
  MEASUREMENT: MeasurementNode,
  FIELD: FieldNode,
  DATE_RANGE: EditorDatePickerNode,
  VALUE_THRESHOLD: ValueThresholdNode,
};

const initialNodes: Node[] = [
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

export function Flow() {
  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "bezier",
            animated: true,
          },
          eds,
        ),
      );
    },
    [setEdges],
  );

  const showToastWarning = throttle(() => {
    toast.warning("Invalid connection", {
      description: "Please connect bucket ⇢ measurement ⇢ field ⇢ filter",
    });
  }, 1000);

  const throttleToastWarning = useCallback(showToastWarning, [
    showToastWarning,
  ]);

  const isValidConnection = useCallback(
    (connection: Edge | Connection) => {
      const sourceNode = nodes.find((node) => node.id === connection.source);
      const targetNode = nodes.find((node) => node.id === connection.target);
      const sourceType = sourceNode?.type as NodeType;
      const targetType = targetNode?.type as NodeType;

      if (!sourceNode || !targetNode) return false;

      if (sourceType === "BUCKET" && targetType === "DATE_RANGE") return true;
      if (sourceType === "DATE_RANGE" && targetType === "MEASUREMENT")
        return true;
      if (sourceType === "MEASUREMENT" && targetType === "FIELD") return true;
      if (sourceType === "FIELD" && targetType === "VALUE_THRESHOLD")
        return true;

      throttleToastWarning();
      return false;
    },
    [nodes, throttleToastWarning],
  );

  return (
    <main className="h-full w-full">
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionLineType={ConnectionLineType.Bezier}
        isValidConnection={isValidConnection}
        maxZoom={1}
        fitView
        proOptions={{ hideAttribution: true }}
        style={{
          transitionDuration: "150",
          transition: "ease-in-out",
        }}
      >
        <Controls />
        <MiniMap />
        <Background
          variant={BackgroundVariant.Dots}
          gap={12}
          size={1}
          className="bg-muted"
        />
      </ReactFlow>
    </main>
  );
}
