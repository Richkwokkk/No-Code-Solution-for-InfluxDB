import * as React from "react";

import { Handle, Position } from "@xyflow/react";

import {
  Check,
  Cylinder,
  Grid,
  Hash,
  type LucideIcon,
  RectangleEllipsis,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { EditorDatePickerNode } from "./date-range-picker";

export interface EditorBaseNodeProps {
  value: string;
  type: string;
  icon: LucideIcon;
  children?: React.ReactNode;
  leftHandle?: boolean;
  rightHandle?: boolean;
  ariaExpanded?: boolean;
}

export function EditorBaseNode({
  type,
  value,
  icon: Icon,
  leftHandle = true,
  rightHandle = true,
  ariaExpanded = false,
}: EditorBaseNodeProps) {
  return (
    <Button
      asChild
      variant="outline"
      aria-expanded={ariaExpanded}
      className="min-w-40 rounded-lg border px-2 py-7 shadow-md transition-colors hover:bg-primary-foreground"
    >
      <div className="relative flex items-center justify-between p-2">
        {leftHandle ? (
          <Handle
            type="target"
            id="node-source"
            position={Position.Left}
            className="!-left-[2px] !h-4 !w-1 !min-w-0 !rounded-none !rounded-l-[2px] !border-none !bg-primary shadow-md"
          />
        ) : null}
        <div className="flex items-center space-x-2">
          <div className="text-editor-node-text flex h-10 w-10 items-center justify-center rounded-md bg-gray-100">
            <Icon size={20} />
          </div>
          <div className="flex flex-col pr-1">
            <p className="text-start text-[10px] capitalize opacity-50">
              {type}
            </p>
            <p className="text-start text-xs font-bold">{value}</p>
          </div>
        </div>
        {rightHandle ? (
          <Handle
            type="source"
            id="node-target"
            position={Position.Right}
            className="!-right-[2px] !h-4 !w-1 !min-w-0 !rounded-none !rounded-r-[2px] !border-none !bg-primary shadow-md"
          />
        ) : null}
      </div>
    </Button>
  );
}

type EditorComboNodeProps = Pick<
  EditorBaseNodeProps,
  "type" | "icon" | "rightHandle" | "leftHandle"
> & {
  selections: string[];
};

export function EditorComboboxNode({
  type,
  icon,
  selections,
  rightHandle,
  leftHandle,
}: EditorComboNodeProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="focus:outline-none">
        <EditorBaseNode
          value={
            value || `Select ${type.charAt(0).toUpperCase() + type.slice(1)}`
          }
          type={type}
          icon={icon}
          rightHandle={rightHandle}
          leftHandle={leftHandle}
          ariaExpanded={open}
        />
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder={`Search ${type.charAt(0).toUpperCase() + type.slice(1)}...`}
          />
          <CommandList>
            <CommandEmpty>No {type} found.</CommandEmpty>
            <CommandGroup>
              {selections.map((selection) => (
                <CommandItem
                  key={selection}
                  value={selection}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === selection ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {selection}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export const BucketNode = () => {
  return (
    <EditorComboboxNode
      type="bucket"
      icon={Cylinder}
      selections={["bucket-1", "bucket-2", "bucket-3", "bucket-4"]}
      leftHandle={false}
    />
  );
};

export const MeasurementNode = () => {
  return (
    <EditorComboboxNode
      type="measurement"
      icon={Grid}
      selections={[
        "measurement-1",
        "measurement-2",
        "measurement-3",
        "measurement-4",
      ]}
    />
  );
};

export const FieldNode = () => {
  return (
    <EditorComboboxNode
      type="field"
      icon={RectangleEllipsis}
      selections={["field-1", "field-2", "field-3", "field-4"]}
    />
  );
};

export const ValueThresholdNode = () => {
  const [open, setOpen] = React.useState(false);
  const [minValue, setMinValue] = React.useState<string>("");
  const [maxValue, setMaxValue] = React.useState<string>("");
  const [isMinIncluded, setIsMinIncluded] = React.useState(false);
  const [isMaxIncluded, setIsMaxIncluded] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (
      minValue.length &&
      maxValue.length &&
      parseFloat(minValue) > parseFloat(maxValue)
    ) {
      setError("Min value cannot be greater than max value");
    } else {
      setError("");
    }
  }, [maxValue, minValue]);

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

    if (parseFloat(minValue) > parseFloat(maxValue)) {
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
      <PopoverTrigger asChild>
        <div>
          <EditorBaseNode
            value={displayValue()}
            type="Value Threshold"
            icon={Hash}
            ariaExpanded={open}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <div className="space-y-3 p-4">
          <div className="flex space-x-4">
            <Input
              type="number"
              placeholder="Min"
              value={minValue}
              onChange={(e) => setMinValue(e.target.value)}
              className="w-1/2"
            />
            <div className="flex items-center space-x-1">
              <Checkbox
                id="min-included"
                checked={isMinIncluded}
                onCheckedChange={(checked: boolean) =>
                  setIsMinIncluded(checked)
                }
              />
              <label
                htmlFor="min-included"
                className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Included
              </label>
            </div>
          </div>
          <div className="flex space-x-4">
            <Input
              type="number"
              placeholder="Max"
              value={maxValue}
              onChange={(e) => setMaxValue(e.target.value)}
              className="w-1/2"
            />
            <div className="flex items-center space-x-1">
              <Checkbox
                id="max-included"
                checked={isMaxIncluded}
                onCheckedChange={(checked: boolean) =>
                  setIsMaxIncluded(checked)
                }
              />
              <label
                htmlFor="max-included"
                className="text-xs font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Included
              </label>
            </div>
          </div>
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export const nodeTypes = {
  bucket: BucketNode,
  measurement: MeasurementNode,
  field: FieldNode,
  dateRange: EditorDatePickerNode,
  valueThreshold: ValueThresholdNode,
} as any;
