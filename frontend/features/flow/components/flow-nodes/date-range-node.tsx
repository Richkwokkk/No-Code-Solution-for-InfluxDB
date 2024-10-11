"use client";

import * as React from "react";

import { DateRange } from "react-day-picker";

import {
  useHandleConnections,
  useNodesData,
  useReactFlow,
} from "@xyflow/react";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BaseNode } from "@/features/flow/components/flow-nodes/base-node";
import {
  NodeProps,
  NodeType,
  NodeData,
} from "@/features/flow/components/flow-nodes/types";
import { NODE_TITLES } from "@/features/flow/components/sidebar/constants";

export function DateRangeNode({ id }: NodeProps) {
  const { updateNodeData } = useReactFlow();
  const nodeData = useNodesData(id)?.data as NodeData;
  const { value } = nodeData;

  const bucketConnections = useHandleConnections({
    type: "target",
    id: "BUCKET" as NodeType,
  });
  const bucketData = useNodesData(bucketConnections?.[0]?.source)
    ?.data as NodeData;

  const parseDateRange = (value: string): DateRange | undefined => {
    const [fromStr, toStr] = value.split(" - ");
    const from = new Date(fromStr);
    const to = toStr ? new Date(toStr) : undefined;
    return { from, to };
  };

  const initialDateRange =
    value && value !== "Pick a date range"
      ? parseDateRange(value)
      : {
          from: undefined,
          to: undefined,
        };

  const [date, setDate] = React.useState<DateRange | undefined>(
    initialDateRange,
  );

  React.useEffect(() => {
    if (date?.from) {
      const formattedDate = date.to
        ? `${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}`
        : format(date.from, "LLL dd, y");
      updateNodeData(id, {
        value: formattedDate,
        result: {
          ...bucketData?.result,
          timeStart: format(date.from, "yyyy-MM-dd'T'HH'%3A'mm'%3A'ss'Z'"),
          timeStop: date.to
            ? format(date.to, "yyyy-MM-dd'T'HH'%3A'mm'%3A'ss'Z'")
            : undefined,
        },
      });
    } else {
      updateNodeData(id, {
        value: undefined,
        result: {
          ...bucketData?.result,
          timeStart: undefined,
          timeStop: undefined,
        },
      });
    }
  }, [bucketData, date, id, updateNodeData]);

  const handleDateChange = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);
  };

  return (
    <Popover>
      <PopoverTrigger className="focus:outline-none">
        <BaseNode
          title={NODE_TITLES.DATE_RANGE}
          value={value ?? "Pick a date range"}
          icon={CalendarIcon}
          upHandleId="BUCKET"
          underHandleId="DATE_RANGE"
          upHandle
          underHandle
        />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="center">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={handleDateChange}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
