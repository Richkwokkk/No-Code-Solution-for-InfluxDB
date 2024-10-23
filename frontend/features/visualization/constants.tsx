import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ChartConfig } from "@/components/ui/chart";
import { Checkbox } from "@/components/ui/checkbox";
import { Row } from "@/features/visualization/types";

export const columns: ColumnDef<Row>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all rows on this page"
        className="flex h-4 w-4"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        className="flex h-4 w-4"
        aria-label={`Select row ${row.index + 1}, ${row.getValue("time")} ${row.getValue("value")} ${row.getValue("field")} ${row.getValue("measurement")} ${row.getValue("room")}`}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "time",
    accessorKey: "time",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          aria-label="Sort by time"
        >
          Time
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div aria-label={`Time: ${row.getValue("time")}`}>
        {row.getValue("time")}
      </div>
    ),
  },
  {
    id: "value",
    accessorKey: "value",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Value
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div aria-label={`Value: ${row.getValue("value")}`}>
        {row.getValue("value")}
      </div>
    ),
  },
  {
    id: "field",
    accessorKey: "field",
    header: "Field",
    cell: ({ row }) => (
      <div aria-label={`Field: ${row.getValue("field")}`}>
        {row.getValue("field")}
      </div>
    ),
  },
  {
    id: "measurement",
    accessorKey: "measurement",
    header: "Measurement",
    cell: ({ row }) => (
      <div aria-label={`Measurement: ${row.getValue("measurement")}`}>
        {row.getValue("measurement")}
      </div>
    ),
  },
  {
    id: "room",
    accessorKey: "room",
    header: "Room",
    cell: ({ row }) => (
      <div aria-label={`Room: ${row.getValue("room")}`}>
        {row.getValue("room")}
      </div>
    ),
  },
];

export const chartConfig = {} satisfies ChartConfig;
