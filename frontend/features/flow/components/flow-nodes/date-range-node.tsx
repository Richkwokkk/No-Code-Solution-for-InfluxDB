"use client";

import * as React from "react";

import { DateRange } from "react-day-picker";

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

export function DateRangeNode({}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: addDays(new Date(2024, 0, 20), 20),
  });

  const [value, setValue] = React.useState<string>("Pick a date range");

  const handleDateChange = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);
    if (selectedDate?.from) {
      const formattedDate = selectedDate.to
        ? `${format(selectedDate.from, "LLL dd, y")} - ${format(selectedDate.to, "LLL dd, y")}`
        : format(selectedDate.from, "LLL dd, y");
      setValue(formattedDate);
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
