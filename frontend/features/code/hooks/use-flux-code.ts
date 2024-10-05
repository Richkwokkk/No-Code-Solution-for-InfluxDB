import * as React from "react";

import { Edge, Node, useEdges, useNodes } from "@xyflow/react";

import { NodeData } from "@/features/flow/components/flow-nodes";
import { FLOW_KEY } from "@/features/flow/constants";

export const useFluxCode = () => {
  const [fluxCode, setFluxCode] = React.useState("");
  const nodesFromFlow = useNodes();
  const edgesFromFlow = useEdges();

  const flow = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem(FLOW_KEY) || "");
    } catch {
      return null;
    }
  }, []);

  const nodes = React.useMemo(
    () => (nodesFromFlow.length > 0 ? nodesFromFlow : flow?.nodes || []),
    [flow?.nodes, nodesFromFlow],
  );

  const edges = React.useMemo(
    () => (edgesFromFlow.length > 0 ? edgesFromFlow : flow?.edges || []),
    [flow?.edges, edgesFromFlow],
  );

  React.useEffect(() => {
    const bucketNode = nodes.find((node: Node) => node.type === "BUCKET");
    const bucketValue = bucketNode?.data.value || "/* Pick a bucket */";
    let newFluxCode = `from(bucket: "${bucketValue}")\n`;

    const dateRangeEdge = edges.find(
      (edge: Edge) => edge.targetHandle === "BUCKET",
    );
    const dateRangeNode = nodes.find(
      (node: Node) => node.id === dateRangeEdge?.target,
    );

    if (dateRangeNode) {
      const { timeStart, timeStop } =
        (dateRangeNode.data as NodeData)?.result || {};
      if (timeStart) {
        const start = timeStart.replaceAll("%3A", ":");
        const stop = timeStop
          ? `, stop: ${timeStop.replaceAll("%3A", ":")}`
          : "";
        newFluxCode += `  |> range(start: ${start}${stop})\n`;
      }
    }

    const measurementEdges = edges.filter(
      (edge: Edge) => edge.source === dateRangeNode?.id,
    );
    const measurementNodes = measurementEdges
      .map((edge: Edge) => nodes.find((node: Node) => node.id === edge.target))
      .filter(Boolean);

    if (measurementNodes.length > 0) {
      const measurementFilters = measurementNodes
        .map(
          (node: Node) =>
            `r._measurement == "${node?.data?.value ?? "/* Pick a measurement */"}"`,
        )
        .join(" or ");
      newFluxCode += `  |> filter(fn: (r) => ${measurementFilters})\n`;
    }

    setFluxCode(newFluxCode);
  }, [nodes, edges]);

  return fluxCode;
};
