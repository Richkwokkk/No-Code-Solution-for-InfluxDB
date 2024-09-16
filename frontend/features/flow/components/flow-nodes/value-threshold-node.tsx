import * as React from "react";

import { Hash } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { BaseNode } from "@/features/flow/components/flow-nodes/base-node";
import { NODE_TITLES } from "@/features/flow/constants";

export const ValueThresholdNode = () => {
  const [open, setOpen] = React.useState(false);
  const [minValue, setMinValue] = React.useState<string>("");
  const [maxValue, setMaxValue] = React.useState<string>("");
  const [isMinIncluded, setIsMinIncluded] = React.useState(false);
  const [isMaxIncluded, setIsMaxIncluded] = React.useState(false);
  const [error, setError] = React.useState("");

  const validateRange = (minValue: string, maxValue: string) => {
    if (
      minValue.length &&
      maxValue.length &&
      parseFloat(minValue) > parseFloat(maxValue)
    ) {
      setError("Min value should be no greater than max value");
    } else {
      setError("");
    }
  };

  const handlePopoverClose = () => {
    if (error) {
      setMinValue("");
      setMaxValue("");
      setIsMinIncluded(false);
      setIsMaxIncluded(false);
      setError("");
    }
  };

  const displayValue = () => {
    if (!minValue.length && !maxValue.length) {
      return "Pick a threshold";
    }

    if (error) {
      return "Pick a valid threshold";
    }

    const minSymbol = isMinIncluded ? "≤" : "<";
    const maxSymbol = isMaxIncluded ? "≤" : "<";

    if (minValue && maxValue) {
      return `${minValue} ${minSymbol} value ${maxSymbol} ${maxValue}`;
    } else if (minValue) {
      return `${minValue} ${minSymbol} value`;
    } else if (maxValue) {
      return `value ${maxSymbol} ${maxValue}`;
    }

    return "";
  };

  return (
    <Popover
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) handlePopoverClose();
      }}
    >
      <PopoverTrigger className="focus:outline-none" asChild>
        <div>
          <BaseNode
            value={displayValue()}
            title={NODE_TITLES.VALUE_THRESHOLD}
            icon={Hash}
            ariaExpanded={open}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[230px] p-0">
        <div className="space-y-3 p-4">
          <div className="flex space-x-4">
            <Input
              type="number"
              placeholder="Min"
              value={minValue}
              onChange={(e) => setMinValue(e.target.value)}
              onBlur={() => validateRange(minValue, maxValue)}
              className="w-3/5"
            />
            <div className="flex w-full items-center justify-between space-x-1">
              <Switch
                id="min-included"
                checked={isMinIncluded}
                onCheckedChange={(checked: boolean) =>
                  setIsMinIncluded(checked)
                }
                aria-readonly
              />
              <label
                htmlFor="min-included"
                className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {isMinIncluded ? "Included" : "Excluded"}
              </label>
            </div>
          </div>
          <div className="flex space-x-4">
            <Input
              type="number"
              placeholder="Max"
              value={maxValue}
              onChange={(e) => setMaxValue(e.target.value)}
              onBlur={() => validateRange(minValue, maxValue)}
              className="w-3/5"
            />
            <div className="flex w-full items-center justify-between space-x-1">
              <Switch
                id="max-included"
                checked={isMaxIncluded}
                onCheckedChange={(checked: boolean) =>
                  setIsMaxIncluded(checked)
                }
                aria-readonly
              />
              <label
                htmlFor="max-included"
                className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {isMaxIncluded ? "Included" : "Excluded"}
              </label>
            </div>
          </div>
          {error && (
            <p className="mt-1 text-xs font-medium text-destructive">{error}</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
