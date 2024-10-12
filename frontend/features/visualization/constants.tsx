import { ColumnDef } from "@tanstack/react-table";

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
        aria-label="Select all"
        className="flex h-4 w-4"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="flex h-4 w-4"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "start",
    header: "Date Range Start Time",
  },
  {
    accessorKey: "stop",
    header: "Date Range Stop Time",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "field",
    header: "Field",
  },
  {
    accessorKey: "measurement",
    header: "Measurement",
  },
  {
    accessorKey: "room",
    header: "Room",
  },
];

export const chartConfig = {} satisfies ChartConfig;
