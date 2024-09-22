import * as React from "react";

import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  BackgroundVariant,
  ConnectionLineType,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  ReactFlowInstance,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { toast } from "sonner";

import { BucketNode } from "@/features/flow/components/flow-nodes/bucket-node";
import { DateRangeNode } from "@/features/flow/components/flow-nodes/date-range-node";
import { FieldNode } from "@/features/flow/components/flow-nodes/field-node";
import { MeasurementNode } from "@/features/flow/components/flow-nodes/measurement-node";
import { ValueThresholdNode } from "@/features/flow/components/flow-nodes/value-threshold-node";
import { FLOW_KEY, initialNodes } from "@/features/flow/constants";
import { NodeType } from "@/features/flow/types";
import { throttle } from "@/lib/utils";

type ReactFlowNodeTypes = {
  [_t in NodeType]: React.FC;
};

export const nodeTypes: ReactFlowNodeTypes = {
  BUCKET: BucketNode,
  MEASUREMENT: MeasurementNode,
  FIELD: FieldNode,
  DATE_RANGE: DateRangeNode,
  VALUE_THRESHOLD: ValueThresholdNode,
};

export function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [rfInstance, setRfInstance] = React.useState<ReactFlowInstance | null>(
    null,
  );
  const { setViewport } = useReactFlow();

  const onConnect = React.useCallback(
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
      description:
        "Please connect bucket ⇢ date range ⇢ measurement ⇢ field ⇢ value threshold",
    });
  }, 1000);

  const throttleToastWarning = React.useCallback(showToastWarning, [
    showToastWarning,
  ]);

  const isValidConnection = React.useCallback(
    (connection: Edge | Connection) => {
      const sourceNode = nodes.find((node) => node.id === connection.source);
      const targetNode = nodes.find((node) => node.id === connection.target);
      const sourceType = sourceNode?.type as NodeType;
      const targetType = targetNode?.type as NodeType;

      if (!sourceNode || !targetNode) return false;

      if (
        (sourceType === "DATE_RANGE" && targetType === "DATE_RANGE") ||
        (sourceType === "VALUE_THRESHOLD" && targetType === "VALUE_THRESHOLD")
      )
        return false;

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

  const saveRfInstance = React.useCallback(() => {
    if (rfInstance && nodes && edges) {
      const flow = rfInstance.toObject();
      localStorage.setItem(FLOW_KEY, JSON.stringify(flow));
    }
  }, [edges, nodes, rfInstance]);

  const restoreFlow = React.useCallback(() => {
    const restore = async () => {
      let flow = null;
      try {
        flow = JSON.parse((await localStorage.getItem(FLOW_KEY)) || "");
      } catch (error) {
        flow = null;
      }

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };
    restore();
  }, [setEdges, setNodes, setViewport]);

  React.useEffect(restoreFlow, [restoreFlow]);
  React.useEffect(saveRfInstance, [saveRfInstance]);

  return (
    <section className="h-full w-full">
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setRfInstance}
        onMoveEnd={saveRfInstance}
        connectionLineType={ConnectionLineType.Bezier}
        isValidConnection={isValidConnection}
        maxZoom={1}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Controls />
        <Background
          variant={BackgroundVariant.Dots}
          gap={12}
          size={1}
          className="bg-muted"
        />
      </ReactFlow>
    </section>
  );
}
