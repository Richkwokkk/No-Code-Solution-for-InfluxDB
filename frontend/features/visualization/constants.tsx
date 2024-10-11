import { ColumnDef } from "@tanstack/react-table";

import { ChartConfig } from "@/components/ui/chart";
import { Checkbox } from "@/components/ui/checkbox";
import { Measurement } from "@/features/visualization/types";

export const columns: ColumnDef<Measurement>[] = [
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
    accessorKey: "_time",
    header: "Time",
  },
  {
    accessorKey: "_start",
    header: "Start",
  },
  {
    accessorKey: "_stop",
    header: "Stop",
  },
  {
    accessorKey: "_value",
    header: "Value",
  },
  {
    accessorKey: "_field",
    header: "Field",
  },
  {
    accessorKey: "_measurement",
    header: "Measurement",
  },
  {
    accessorKey: "room",
    header: "Room",
  },
];

export const chartConfig = {} satisfies ChartConfig;
