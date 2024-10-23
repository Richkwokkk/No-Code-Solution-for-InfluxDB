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
        aria-label={`Select row ${row.index + 1}`}
        className="flex h-4 w-4"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "time",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Time
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "value",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Value
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
