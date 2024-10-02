import React from "react";

import { useNodesData, useReactFlow } from "@xyflow/react";

import { Check } from "lucide-react";

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
import {
  BaseNode,
  BaseNodeProps,
} from "@/features/flow/components/flow-nodes/base-node";
import { cn } from "@/lib/utils";

type ComboNodeProps = Pick<
  BaseNodeProps,
  "title" | "icon" | "upHandle" | "underHandle" | "underHandleId" | "upHandleId"
> & {
  selections?: string[];
  onSelectNodeOption?: ((_value: string | undefined) => void) | undefined;
  initialValue?: string;
  id: string;
};

export function ComboboxNode({
  id,
  title: type,
  icon,
  selections,
  underHandle,
  upHandle,
  underHandleId,
  upHandleId,
  onSelectNodeOption,
}: ComboNodeProps) {
  const [open, setOpen] = React.useState(false);
  const { updateNodeData } = useReactFlow();
  const nodeData = useNodesData(id);
  const value = nodeData?.data?.value as string | undefined;

  React.useEffect(() => {
    if (!selections) {
      updateNodeData(id, { bucket: "" });
    }
  }, [id, selections, updateNodeData]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="focus:outline-none">
        <BaseNode
          value={value || `Select a ${type}`}
          title={type}
          icon={icon}
          underHandle={underHandle}
          upHandle={upHandle}
          underHandleId={underHandleId}
          upHandleId={upHandleId}
          ariaExpanded={open}
        />
      </PopoverTrigger>
      <PopoverContent align="center" className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder={`Search ${type.charAt(0).toUpperCase() + type.slice(1)}...`}
          />
          <CommandList>
            <CommandEmpty>No {type} found.</CommandEmpty>
            <CommandGroup>
              {selections?.map((selection) => (
                <CommandItem
                  key={selection}
                  value={selection}
                  onSelect={(currentValue) => {
                    updateNodeData(id, {
                      value: currentValue === value ? "" : currentValue,
                    });
                    onSelectNodeOption?.(
                      currentValue === value ? undefined : currentValue,
                    );
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
