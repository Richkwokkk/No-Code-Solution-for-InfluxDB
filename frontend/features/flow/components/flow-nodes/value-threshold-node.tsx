import * as React from "react";

import { useNodesData, useReactFlow } from "@xyflow/react";

import { Hash } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
      thresholdType,
      isThresholdIncluded: isIncluded,
    } = nodeData?.result || {};
    const isThresholdIncluded = isIncluded === undefined ? false : isIncluded;

    if (thresholdValue !== undefined && thresholdType !== undefined) {
      const values = {
        max: `value ${isThresholdIncluded ? "≤" : "<"} ${thresholdValue}`,
        min: `value ${isThresholdIncluded ? "≥" : ">"} ${thresholdValue}`,
        equal: `value = ${thresholdValue}`,
        notEqual: `value ≠ ${thresholdValue}`,
      };
      value = values[thresholdType];
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
    const newValue =
      e.target.value === "" ? undefined : parseFloat(e.target.value);
    updateNodeData(id, {
      result: {
        ...nodeData.result,
        thresholdValue: newValue,
      },
    });
  };

  const handleSwitchChange = (checked: boolean) => {
    updateNodeData(id, {
      result: {
        ...nodeData.result,
        isThresholdIncluded: checked,
      },
    });
  };

  const handleSelectChange = (value: string) => {
    updateNodeData(id, {
      result: {
        ...nodeData.result,
        thresholdType: value,
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
      <PopoverContent align="center" className="w-[230px] p-0">
        <div className="space-y-3 p-4">
          <div className="flex w-full items-center justify-between">
            <label
              htmlFor="threshold-value"
              className="text-xs capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              value
            </label>
            <div className="flex w-[60%] items-center justify-start">
              <Input
                type="number"
                value={
                  nodeData?.result?.thresholdValue !== undefined
                    ? nodeData.result.thresholdValue
                    : ""
                }
                onChange={handleInputChange}
                className="text-xs"
              />
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <label
              htmlFor="threshold-type"
              className="text-xs capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Type
            </label>
            <div className="flex w-[60%] items-center justify-start">
              <Select
                onValueChange={handleSelectChange}
                value={nodeData?.result?.thresholdType}
              >
                <SelectTrigger className="w-full text-xs">
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent align="center">
                  <SelectGroup>
                    <SelectItem value="max">Smaller than</SelectItem>
                    <SelectItem value="min">Greater than</SelectItem>
                    <SelectItem value="equal">Equal</SelectItem>
                    <SelectItem value="notEqual">Not Equal</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          {nodeData?.result?.thresholdType !== "equal" &&
            nodeData?.result?.thresholdType !== "notEqual" && (
              <div className="flex w-full items-center justify-between">
                <label
                  htmlFor="threshold-included"
                  className="text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {nodeData?.result?.isThresholdIncluded
                    ? "Included"
                    : "Excluded"}
                </label>
                <div className="flex w-[60%] items-center justify-start">
                  <Switch
                    id="threshold-included"
                    checked={nodeData?.result?.isThresholdIncluded ?? false}
                    onCheckedChange={handleSwitchChange}
                    aria-readonly
                  />
                </div>
              </div>
            )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
