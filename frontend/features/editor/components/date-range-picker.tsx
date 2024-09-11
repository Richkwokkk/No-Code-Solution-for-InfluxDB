"use client";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";
import { DateRange } from "react-day-picker";
import { EditorBaseNode } from "./editor-nodes";

export function EditorDatePickerNode({}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  const [value, setValue] = React.useState<string>("Pick a date");

  const handleDateChange = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);
    if (selectedDate?.from) {
      const formattedDate = selectedDate.to
        ? `${format(selectedDate.from, "LLL dd, y")} - ${format(selectedDate.to, "LLL dd, y")}`
        : format(selectedDate.from, "LLL dd, y");
      setValue(formattedDate);
    } else {
      setValue("Pick a date");
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <EditorBaseNode type="date" value={value} icon={CalendarIcon}>
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
            <span>Pick a date</span>
          )}
        </EditorBaseNode>
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
