import { nodeTypes } from "@/features/editor/components/editor-nodes";
import { throttle } from "@/lib/utils";
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
  applyNodeChanges,
  NodeChange,
  EdgeChange,
  applyEdgeChanges,
  Node,
  Edge,
  FitViewOptions,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import React, { useCallback } from "react";
import { toast } from "sonner";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "bucket",
    deletable: false,
    position: {
      x: 0,
      y: 0,
    },
    data: {
      label: "1",
    },
  },
  {
    id: "2",
    type: "measurement",
    deletable: true,
    position: {
      x: 400,
      y: 200,
    },
    data: {
      label: "2",
    },
  },
  {
    id: "3",
    type: "field",
    deletable: true,
    position: {
      x: 800,
      y: 400,
    },
    data: {
      label: "3",
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    style: { strokeWidth: 2 },
    type: "smoothstep",
  },
];

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

export function EditorFlow() {
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds) as typeof initialNodes),
    [setNodes],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds) as typeof initialEdges),
    [setEdges],
  );
  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            style: { strokeWidth: 2 },
            type: "smoothstep",
          },
          eds,
        ),
      ),
    [setEdges],
  );

  const showToastWarning = throttle(() => {
    toast.warning("Invalid connection", {
      description: "Bucket -> Measurement -> Field",
    });
  }, 1000);

  const throttleToastWarning = useCallback(showToastWarning, [
    showToastWarning,
  ]);

  const isValidConnection = useCallback(
    (connection: Edge | Connection) => {
      const sourceNode = nodes.find((node) => node.id === connection.source);
      const targetNode = nodes.find((node) => node.id === connection.target);

      if (!sourceNode || !targetNode) return false;

      if (sourceNode.type === "bucket" && targetNode.type === "measurement")
        return true;
      if (sourceNode.type === "measurement" && targetNode.type === "field")
        return true;

      throttleToastWarning();
      return false;
    },
    [nodes, throttleToastWarning],
  );

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionLineType={ConnectionLineType.SmoothStep}
        isValidConnection={isValidConnection}
        fitView
        fitViewOptions={fitViewOptions}
        maxZoom={1}
        proOptions={{ hideAttribution: true }}
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
    </div>
  );
}
