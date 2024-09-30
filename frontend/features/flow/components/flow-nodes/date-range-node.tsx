"use client";

import * as React from "react";

import { DateRange } from "react-day-picker";

import {
  useHandleConnections,
  useNodesData,
  useReactFlow,
} from "@xyflow/react";

import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BaseNode } from "@/features/flow/components/flow-nodes/base-node";
import { NODE_TITLES } from "@/features/flow/components/sidebar/constants";
import { NodeType } from "@/features/flow/types";

export type DateRangeNodeProps = { id: string };

export function DateRangeNode({ id }: DateRangeNodeProps) {
  const { updateNodeData } = useReactFlow();

  const bucketConnections = useHandleConnections({
    type: "target",
    id: "BUCKET" as NodeType,
  });
  const bucket = useNodesData(bucketConnections?.[0]?.source)?.data;
  console.log({ bucket });

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 1),
    to: addDays(new Date(2024, 0, 1), 1),
  });

  const [value, setValue] = React.useState<string>("Pick a date range");

  const handleDateChange = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);
    if (selectedDate?.from) {
      const formattedDate = selectedDate.to
        ? `${format(selectedDate.from, "LLL dd, y")} - ${format(selectedDate.to, "LLL dd, y")}`
        : format(selectedDate.from, "LLL dd, y");
      setValue(formattedDate);

      // update date range node data with its source bucket node data
      if (selectedDate.to) {
        updateNodeData(id, {
          ...bucket,
          dateRange: {
            time_start: format(selectedDate.from, "yyyy-MM-dd'T'HH:mm:ss'Z'"),
            time_stop: format(selectedDate.to, "yyyy-MM-dd'T'HH:mm:ss'Z'"),
          },
        });
      }
    } else {
      setValue("Pick a date range");
    }
  };

  return (
    <Popover>
      <PopoverTrigger className="focus:outline-none">
        <BaseNode
          title={NODE_TITLES.DATE_RANGE}
          value={value}
          icon={CalendarIcon}
          leftHandleId="BUCKET"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "LLL dd, y")} -{" "}
                {format(date.to, "LLL dd, y")}
              </>
            ) : (
              format(date.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date range</span>
          )}
        </BaseNode>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
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
