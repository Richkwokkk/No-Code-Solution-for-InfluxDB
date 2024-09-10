import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Handle, Position } from "@xyflow/react";
import {
  Cylinder,
  Grid,
  type LucideIcon,
  RectangleEllipsis,
} from "lucide-react";
import { Check } from "lucide-react";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";
import { DatePickerWithRange } from "./date-range-picker";

export interface EditorBaseNodeProps {
  value: string;
  type: string;
  icon: LucideIcon;
  children?: React.ReactNode;
  leftHandle?: boolean;
  rightHandle?: boolean;
  ariaExpanded?: boolean;
}

function EditorBaseNode({
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
      className="min-w-40 rounded-lg border px-2 py-7 shadow-md hover:bg-background"
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

type EditorDatePickerNodeProps = {
  type: string;
  icon: React.ComponentType<any>;
  leftHandle?: boolean;
  rightHandle?: boolean;
};

export function EditorDatePickerNode({
  type,
  icon: Icon,
  leftHandle = true,
  rightHandle = true,
}: EditorDatePickerNodeProps) {
  const [dateRange, setDateRange] = React.useState<string>("Pick a date");

  return (
    <Button
      asChild
      variant="outline"
      className="min-w-40 rounded-lg border px-2 py-7 shadow-md hover:bg-background"
    >
      <div className="relative flex items-center justify-between p-2">
        {leftHandle ? (
          <Handle
            type="target"
            position={Position.Left}
            className="!-left-[2px] !h-4 !w-1 !min-w-0 !rounded-none !rounded-l-[2px] !border-none !bg-primary shadow-md"
          />
        ) : null}

        <div className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100">
            {Icon && <Icon size={20} />}
          </div>
          <div className="flex flex-col pr-1">
            <p className="text-start text-[10px] capitalize opacity-50">
              {type}
            </p>
            <div className="date-picker-container">
              <DatePickerWithRange
                onChange={(range) => {
                  if (range?.from && range?.to) {
                    setDateRange(
                      `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`,
                    );
                  } else if (range?.from) {
                    setDateRange(range.from.toLocaleDateString());
                  } else {
                    setDateRange("Pick a date");
                  }
                }}
                className="scale-[0.8]"
              />
            </div>
          </div>
        </div>

        {rightHandle ? (
          <Handle
            type="source"
            position={Position.Right}
            className="!-right-[2px] !h-4 !w-1 !min-w-0 !rounded-none !rounded-r-[2px] !border-none !bg-primary shadow-md"
          />
        ) : null}
      </div>
    </Button>
  );
}

export const FilterNode = () => {
  return (
    <EditorDatePickerNode
      type="filter"
      icon={CalendarIcon}
      leftHandle={true}
      rightHandle={true}
    />
  );
};

export const nodeTypes = {
  bucket: BucketNode,
  measurement: MeasurementNode,
  field: FieldNode,
  filter: FilterNode,
} as any;
