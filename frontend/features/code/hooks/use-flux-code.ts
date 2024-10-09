import * as React from "react";

import { Edge, Node, useEdges, useNodes } from "@xyflow/react";

import { NodeData, NodeType } from "@/features/flow/components/flow-nodes";
import { FLOW_KEY } from "@/features/flow/constants";

export const useFluxCode = () => {
  const [fluxCode, setFluxCode] = React.useState("");
  const nodesFromFlow = useNodes();
  const edgesFromFlow = useEdges();

  let flow = null;
  try {
    flow = JSON.parse(localStorage.getItem(FLOW_KEY) || "");
  } catch (error) {
    flow = null;
  }

  const nodes = React.useMemo(
    () => (nodesFromFlow.length > 0 ? nodesFromFlow : flow?.nodes || []),
    [flow?.nodes, nodesFromFlow],
  );
  const edges = React.useMemo(
    () => (edgesFromFlow.length > 0 ? edgesFromFlow : flow?.edges || []),
    [flow?.edges, edgesFromFlow],
  );

  React.useEffect(() => {
    // Initialize the Flux code with the bucket node
    const bucketNode = nodes.find(
      (node: Node) => node.type === ("BUCKET" as NodeType),
    );
    const bucketValue = bucketNode?.data.value || "/* Pick a bucket */";
    let newFluxCode = `from(bucket: "${bucketValue}")\n`;

    // Find the date range node connected to the bucket
    const dateRangeEdge = edges.find(
      (edge: Edge) => edge.targetHandle === ("BUCKET" as NodeType),
    );
    const dateRangeNode = nodes.find(
      (node: Node) => node.id === dateRangeEdge?.target,
    );

    // Add the date range to the Flux code if it exists
    if (dateRangeNode) {
      if (dateRangeNode.data.value === undefined) {
        newFluxCode += `  |> range(/* Pick a date range */)\n`;
      } else {
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
    }

    // Find all measurement nodes connected to the date range node
    const measurementEdges = edges.filter(
      (edge: Edge) => edge.source === dateRangeNode?.id,
    );
    const measurementNodes = measurementEdges
      .map((edge: Edge) => nodes.find((node: Node) => node.id === edge.target))
      .filter(Boolean);

    // Add the measurement filters to the Flux code if there are any
    if (measurementNodes.length > 0) {
      const combinedFilters = measurementNodes
        .map((measurementNode: Node) => {
          const connectedFieldNodes = edges
            .filter((edge: Edge) => edge.source === measurementNode.id)
            .map((edge: Edge) =>
              nodes.find((node: Node) => node.id === edge.target),
            )
            .filter(Boolean);

          const fieldFilters = connectedFieldNodes
            .map((fieldNode: Node) => {
              const valueThresholdEdges = edges.filter(
                (edge: Edge) => edge.source === fieldNode.id,
              );
              const valueThresholdNodes = valueThresholdEdges
                .map((edge: Edge) =>
                  nodes.find((node: Node) => node.id === edge.target),
                )
                .filter(Boolean);

              if (valueThresholdNodes.length > 0) {
                const thresholdFilters = valueThresholdNodes
                  .map((thresholdNode: Node) => {
                    const thresholdData = thresholdNode?.data as NodeData;
                    if (thresholdData.value === "Pick a threshold") {
                      return "/* Pick a threshold */";
                    }
                    const [_, operator, thresholdValue] =
                      thresholdData.value.split(" ");
                    return `r._value ${operator} ${thresholdValue}`;
                  })
                  .join(" or ");

                return `(
        r._field == "${fieldNode?.data?.value ?? "/* Pick a field */"}" and 
        (${thresholdFilters})
      )`;
              } else {
                return `r._field == "${fieldNode?.data?.value ?? "/* Pick a field */"}"`;
              }
            })
            .join(" or ");
          if (fieldFilters.length > 1) {
            return `
    (
      r._measurement == "${measurementNode?.data?.value ?? "/* Pick a measurement */"}" and 
      ${fieldFilters}
    )`;
          }

          return `(r._measurement == "${measurementNode?.data?.value ?? "/* Pick a measurement */"}")`;
        })
        .join(" or ");
      newFluxCode += `  |> filter(fn: (r) => ${combinedFilters}
  )\n`;
    }

    setFluxCode(newFluxCode);
  }, [nodes, edges]);

  return fluxCode;
};
