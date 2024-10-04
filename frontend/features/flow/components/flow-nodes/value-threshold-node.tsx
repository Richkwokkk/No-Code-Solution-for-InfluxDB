import * as React from "react";

import { useNodesData, useReactFlow } from "@xyflow/react";

import { Hash } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { BaseNode } from "@/features/flow/components/flow-nodes/base-node";
import {
  NodeData,
  NodeProps,
} from "@/features/flow/components/flow-nodes/types";
import { NODE_TITLES } from "@/features/flow/components/sidebar/constants";

export const ValueThresholdNode = ({ id }: NodeProps) => {
  const [open, setOpen] = React.useState(false);
  const nodeData = useNodesData(id)?.data as NodeData;
  const { updateNodeData } = useReactFlow();

  React.useEffect(() => {
    if (!nodeData) return;

    let value = "Pick a threshold";
    const {
      thresholdValue,
      thresholdType: type,
      isThresholdIncluded: isIncluded,
    } = nodeData?.result || {};
    const thresholdType = type === undefined ? "min" : type;
    const isThresholdIncluded = isIncluded === undefined ? false : isIncluded;

    if (thresholdValue !== undefined) {
      value =
        thresholdType === "max"
          ? `value ${isThresholdIncluded ? "≤" : "<"} ${thresholdValue}`
          : `value ${isThresholdIncluded ? "≥" : ">"} ${thresholdValue}`;
    }

    if (nodeData?.value !== value) {
      updateNodeData(id, {
        value,
        result: {
          ...nodeData.result,
          thresholdValue,
          thresholdType,
          isThresholdIncluded,
        },
      });
    }
  }, [id, nodeData, updateNodeData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value) || undefined;
    updateNodeData(id, {
      result: {
        ...nodeData.result,
        thresholdValue: newValue,
      },
    });
  };

  const handleSwitchChange = (checked: boolean, type: "type" | "included") => {
    updateNodeData(id, {
      result: {
        ...nodeData.result,
        ...(type === "type"
          ? { thresholdType: checked ? "max" : "min" }
          : { isThresholdIncluded: checked }),
      },
    });
  };

  return (
    <Popover
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
      }}
    >
      <PopoverTrigger className="focus:outline-none" asChild>
        <div>
          <BaseNode
            value={nodeData?.value ?? "Pick a threshold"}
            title={NODE_TITLES.VALUE_THRESHOLD}
            icon={Hash}
            ariaExpanded={open}
            upHandle
            underHandle
          />
        </div>
      </PopoverTrigger>
      <PopoverContent align="center" className="w-[180px] p-0">
        <div className="space-y-3 p-4">
          <div className="flex w-full items-center justify-between">
            <label
              htmlFor="threshold-"
              className="text-xs font-bold capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              threshold
            </label>
            <Input
              type="number"
              value={nodeData?.result?.thresholdValue ?? ""}
              onChange={handleInputChange}
              className="w-[70px] text-xs font-bold"
            />
          </div>
          <div className="flex w-full items-center justify-between">
            <label
              htmlFor="threshold-"
              className="text-xs font-bold capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {nodeData?.result?.thresholdType === "max"
                ? "maximum"
                : "minimum"}
            </label>
            <div className="flex w-[70px] items-center justify-start">
              <Switch
                id="threshold-type"
                checked={nodeData?.result?.thresholdType === "max"}
                onCheckedChange={(checked) =>
                  handleSwitchChange(checked, "type")
                }
                aria-readonly
              />
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <label
              htmlFor="threshold-"
              className="text-xs font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {nodeData?.result?.isThresholdIncluded ? "Included" : "Excluded"}
            </label>
            <div className="flex w-[70px] items-center justify-start">
              <Switch
                id="threshold-included"
                checked={nodeData?.result?.isThresholdIncluded ?? false}
                onCheckedChange={(checked) =>
                  handleSwitchChange(checked, "included")
                }
                aria-readonly
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
