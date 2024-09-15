import React from "react";

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
  | "title"
  | "icon"
  | "rightHandle"
  | "leftHandle"
  | "rightHandleId"
  | "leftHandleId"
> & {
  selections?: string[];
  onSelectNodeOption?: ((_value: string) => void) | undefined;
};

export function ComboboxNode({
  title: type,
  icon,
  selections,
  rightHandle,
  leftHandle,
  rightHandleId,
  leftHandleId,
  onSelectNodeOption,
}: ComboNodeProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="focus:outline-none">
        <BaseNode
          value={value || `Select a ${type}`}
          title={type}
          icon={icon}
          rightHandle={rightHandle}
          leftHandle={leftHandle}
          rightHandleId={rightHandleId}
          leftHandleId={leftHandleId}
          ariaExpanded={open}
        />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[200px] p-0">
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
                    setValue(currentValue === value ? "" : currentValue);
                    onSelectNodeOption?.(currentValue);
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
