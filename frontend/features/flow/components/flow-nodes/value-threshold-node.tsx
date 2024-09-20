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

interface ValueThresholdState {
  minValue: string;
  maxValue: string;
  isMinIncluded: boolean;
  isMaxIncluded: boolean;
}

export const ValueThresholdNode = () => {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState<ValueThresholdState>({
    minValue: "",
    maxValue: "",
    isMinIncluded: false,
    isMaxIncluded: false,
  });
  const [error, setError] = React.useState("");

  const validateRange = React.useCallback(
    (currentState: ValueThresholdState): string => {
      const { minValue, maxValue, isMinIncluded, isMaxIncluded } = currentState;
      const minNum = parseFloat(minValue);
      const maxNum = parseFloat(maxValue);

      if (isNaN(minNum) || isNaN(maxNum)) {
        return "";
      }

      const areBothIncluded = isMaxIncluded && isMinIncluded;
      const invalidWhenBothIncluded = areBothIncluded && minNum > maxNum;
      const invalidWhenEitherExcluded = !areBothIncluded && minNum >= maxNum;

      if (invalidWhenBothIncluded) {
        return "Min value must be ≤ max value when both are included";
      }
      if (invalidWhenEitherExcluded) {
        return "Min value must be < max value if either is excluded";
      }
      return "";
    },
    [],
  );

  React.useEffect(() => {
    const newError = validateRange(state);
    setError(newError);
  }, [state, validateRange]);

  const handleStateChange = (updates: Partial<ValueThresholdState>) => {
    setState((prevState) => ({ ...prevState, ...updates }));
  };

  const handlePopoverClose = () => {
    if (error) {
      setState({
        minValue: "",
        maxValue: "",
        isMinIncluded: false,
        isMaxIncluded: false,
      });
      setError("");
    }
  };

  const displayValue = () => {
    const { minValue, maxValue, isMinIncluded, isMaxIncluded } = state;

    if (!minValue && !maxValue) {
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
              value={state.minValue}
              onChange={(e) => handleStateChange({ minValue: e.target.value })}
              className="w-3/5"
            />
            <div className="flex w-full items-center justify-between space-x-1">
              <Switch
                id="min-included"
                checked={state.isMinIncluded}
                onCheckedChange={(checked: boolean) =>
                  handleStateChange({ isMinIncluded: checked })
                }
                aria-readonly
              />
              <label
                htmlFor="min-included"
                className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {state.isMinIncluded ? "Included" : "Excluded"}
              </label>
            </div>
          </div>
          <div className="flex space-x-4">
            <Input
              type="number"
              placeholder="Max"
              value={state.maxValue}
              onChange={(e) => handleStateChange({ maxValue: e.target.value })}
              className="w-3/5"
            />
            <div className="flex w-full items-center justify-between space-x-1">
              <Switch
                id="max-included"
                checked={state.isMaxIncluded}
                onCheckedChange={(checked: boolean) =>
                  handleStateChange({ isMaxIncluded: checked })
                }
                aria-readonly
              />
              <label
                htmlFor="max-included"
                className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {state.isMaxIncluded ? "Included" : "Excluded"}
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
