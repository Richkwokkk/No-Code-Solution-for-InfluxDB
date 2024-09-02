"use client";

import { nodeTypes } from "@/features/editor/components/EditorNode";
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
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import React, { useCallback } from "react";

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
  },
];

export default function EditorFlow() {
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
          },
          eds,
        ),
      ),
    [setEdges],
  );

  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionLineType={ConnectionLineType.Bezier}
        nodeTypes={nodeTypes}
        fitView
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
    </main>
  );
}
