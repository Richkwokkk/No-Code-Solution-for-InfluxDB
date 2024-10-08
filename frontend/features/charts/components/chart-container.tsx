import React, { useState } from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { ChevronDown } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";

import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartLegendContent,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

const data = [
  {
    result: "_result",
    table: "0",
    start: "2022-01-01T08:00:00Z",
    stop: "2022-01-01T20:00:01Z",
    time: "2022-01-01T08:00:00.000Z",
    value: 35.9,
    field: "hum",
    measurement: "home",
    room: "Kitchen",
  },
  {
    result: "_result",
    table: "0",
    start: "2022-01-01T08:00:00Z",
    stop: "2022-01-01T20:00:01Z",
    time: "2022-01-01T09:00:00.000Z",
    value: 36.2,
    field: "hum",
    measurement: "home",
    room: "Kitchen",
  },
  {
    result: "_result",
    table: "0",
    start: "2022-01-01T08:00:00Z",
    stop: "2022-01-01T20:00:01Z",
    time: "2022-01-01T10:00:00.000Z",
    value: 36.1,
    field: "hum",
    measurement: "home",
    room: "Kitchen",
  },
  {
    result: "_result",
    table: "0",
    start: "2022-01-01T08:00:00Z",
    stop: "2022-01-01T20:00:01Z",
    time: "2022-01-01T11:00:00.000Z",
    value: 36,
    field: "hum",
    measurement: "home",
    room: "Kitchen",
  },
  {
    result: "_result",
    table: "0",
    start: "2022-01-01T08:00:00Z",
    stop: "2022-01-01T20:00:01Z",
    time: "2022-01-01T12:00:00.000Z",
    value: 36,
    field: "hum",
    measurement: "home",
    room: "Kitchen",
  },
  {
    result: "_result",
    table: "0",
    start: "2022-01-01T08:00:00Z",
    stop: "2022-01-01T20:00:01Z",
    time: "2022-01-01T13:00:00.000Z",
    value: 36.5,
    field: "hum",
    measurement: "home",
    room: "Kitchen",
  },
  {
    result: "_result",
    table: "0",
    start: "2022-01-01T08:00:00Z",
    stop: "2022-01-01T20:00:01Z",
    time: "2022-01-01T14:00:00.000Z",
    value: 36.3,
    field: "hum",
    measurement: "home",
    room: "Kitchen",
  },
  {
    result: "_result",
    table: "0",
    start: "2022-01-01T08:00:00Z",
    stop: "2022-01-01T20:00:01Z",
    time: "2022-01-01T15:00:00.000Z",
    value: 36.2,
    field: "hum",
    measurement: "home",
    room: "Kitchen",
  },
  {
    result: "_result",
    table: "0",
    start: "2022-01-01T08:00:00Z",
    stop: "2022-01-01T20:00:01Z",
    time: "2022-01-01T16:00:00.000Z",
    value: 36,
    field: "hum",
    measurement: "home",
    room: "Kitchen",
  },
  {
    result: "_result",
    table: "0",
    start: "2022-01-01T08:00:00Z",
    stop: "2022-01-01T20:00:01Z",
    time: "2022-01-01T17:00:00.000Z",
    value: 36,
    field: "hum",
    measurement: "home",
    room: "Kitchen",
  },
  {
    result: "_result",
    table: "0",
    start: "2022-01-01T08:00:00Z",
    stop: "2022-01-01T20:00:01Z",
    time: "2022-01-01T18:00:00.000Z",
    value: 36.9,
    field: "hum",
    measurement: "home",
    room: "Kitchen",
  },
  {
    result: "_result",
    table: "0",
    start: "2022-01-01T08:00:00Z",
    stop: "2022-01-01T20:00:01Z",
    time: "2022-01-01T19:00:00.000Z",
    value: 36.6,
    field: "hum",
    measurement: "home",
    room: "Kitchen",
  },
  {
    result: "_result",
    table: "0",
    start: "2022-01-01T08:00:00Z",
    stop: "2022-01-01T20:00:01Z",
    time: "2022-01-01T20:00:00.000Z",
    value: 36.5,
    field: "hum",
    measurement: "home",
    room: "Kitchen",
  },
  {
    result: "_result",
    table: "1",
    start: "2022-01-01T08:00:00Z",
    stop: "2022-01-01T20:00:01Z",
    time: "2022-01-01T08:00:00.000Z",
    value: 35.9,
    field: "hum",
    measurement: "home",
    room: "Living Room",
  },
  {
    result: "_result",
    table: "1",
    start: "2022-01-01T08:00:00Z",
    stop: "2022-01-01T20:00:01Z",
    time: "2022-01-01T09:00:00.000Z",
    value: 35.9,
    field: "hum",
    measurement: "home",
    room: "Living Room",
  },
  {
    result: "_result",
    table: "1",
    start: "2022-01-01T08:00:00Z",
    stop: "2022-01-01T20:00:01Z",
    time: "2022-01-01T10:00:00.000Z",
    value: 36,
    field: "hum",
    measurement: "home",
    room: "Living Room",
  },
  {
    result: "_result",
    table: "1",
    start: "2022-01-01T08:00:00Z",
    stop: "2022-01-01T20:00:01Z",
    time: "2022-01-01T11:00:00.000Z",
    value: 36,
    field: "hum",
    measurement: "home",
    room: "Living Room",
  },
  {
    result: "_result",
    table: "1",
    start: "2022-01-01T08:00:00Z",
    stop: "2022-01-01T20:00:01Z",
    time: "2022-01-01T12:00:00.000Z",
    value: 35.9,
    field: "hum",
    measurement: "home",
    room: "Living Room",
  },
  {
    result: "_result",
    table: "1",
    start: "2022-01-01T08:00:00Z",
    stop: "2022-01-01T20:00:01Z",
    time: "2022-01-01T13:00:00.000Z",
    value: 36,
    field: "hum",
    measurement: "home",
    room: "Living Room",
  },
  {
    result: "_result",
    table: "1",
    start: "2022-01-01T08:00:00Z",
    stop: "2022-01-01T20:00:01Z",
    time: "2022-01-01T14:00:00.000Z",
    value: 36.1,
    field: "hum",
    measurement: "home",
    room: "Living Room",
  },
  {
    result: "_result",
    table: "1",
    start: "2022-01-01T08:00:00Z",
    stop: "2022-01-01T20:00:01Z",
    time: "2022-01-01T15:00:00.000Z",
    value: 36.1,
    field: "hum",
    measurement: "home",
    room: "Living Room",
  },
  {
    result: "_result",
    table: "1",
    start: "2022-01-01T08:00:00Z",
    stop: "2022-01-01T20:00:01Z",
    time: "2022-01-01T16:00:00.000Z",
    value: 36,
    field: "hum",
    measurement: "home",
    room: "Living Room",
  },
  {
    result: "_result",
    table: "1",
    start: "2022-01-01T08:00:00Z",
    stop: "2022-01-01T20:00:01Z",
    time: "2022-01-01T17:00:00.000Z",
    value: 35.9,
    field: "hum",
    measurement: "home",
    room: "Living Room",
  },
  {
    result: "_result",
    table: "1",
    start: "2022-01-01T08:00:00Z",
    stop: "2022-01-01T20:00:01Z",
    time: "2022-01-01T18:00:00.000Z",
    value: 36.2,
    field: "hum",
    measurement: "home",
    room: "Living Room",
  },
  {
    result: "_result",
    table: "1",
    start: "2022-01-01T08:00:00Z",
    stop: "2022-01-01T20:00:01Z",
    time: "2022-01-01T19:00:00.000Z",
    value: 36.3,
    field: "hum",
    measurement: "home",
    room: "Living Room",
  },
  {
    result: "_result",
    table: "1",
    start: "2022-01-01T08:00:00Z",
    stop: "2022-01-01T20:00:01Z",
    time: "2022-01-01T20:00:00.000Z",
    value: 36.4,
    field: "hum",
    measurement: "home",
    room: "Living Room",
  },
];

export type Measurement = {
  result: string;
  table: string;
  start: string;
  stop: string;
  time: string;
  value: number;
  field: string;
  measurement: string;
  room: string;
};

export const columns: ColumnDef<Measurement>[] = [
  {
    accessorKey: "time",
    header: "Time",
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

export function DataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter rooms..."
          value={(table.getColumn("room")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("room")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ChartComponent() {
  const [viewType, setViewType] = useState<"chart" | "table">("chart");
  const [chartType, setChartType] = useState<"line" | "bar">("line");

  return (
    <div>
      <ToggleGroup
        type="single"
        value={viewType}
        onValueChange={(value: string) =>
          setViewType(value as "chart" | "table")
        }
      >
        <ToggleGroupItem value="chart">Chart</ToggleGroupItem>
        <ToggleGroupItem value="table">Data Table</ToggleGroupItem>
      </ToggleGroup>
      {viewType === "chart" && (
        <ToggleGroup
          type="single"
          value={chartType}
          onValueChange={(value: string) =>
            setChartType(value as "line" | "bar")
          }
        >
          <ToggleGroupItem value="line">Line Chart</ToggleGroupItem>
          <ToggleGroupItem value="bar">Bar Chart</ToggleGroupItem>
        </ToggleGroup>
      )}
      {viewType === "chart" ? (
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          {chartType === "line" ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(11, 16)}
              />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend content={<ChartLegendContent />} />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="time"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(11, 16)}
              />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend content={<ChartLegendContent />} />
              <Bar dataKey="value" fill="var(--color-desktop)" radius={4} />
            </BarChart>
          )}
        </ChartContainer>
      ) : (
        <DataTable />
      )}
    </div>
  );
}

export default ChartComponent;

// export function ChartComponent() {
//   const [viewType, setViewType] = useState<"chart" | "table">("chart");
//   const [chartType, setChartType] = useState<"line" | "bar">("line");

//   const toggleChartType = () => {
//     setChartType((prevType) => (prevType === "line" ? "bar" : "line"));
//   };

//   const toggleViewType = () => {
//     setViewType((prevType) => (prevType === "chart" ? "table" : "chart"));
//   };

//   return (
//     <div>
//       <button onClick={toggleViewType}>
//         {viewType === "chart" ? "Switch to Data Table" : "Switch to Chart"}
//       </button>
//       {viewType === "chart" ? (
//         <>
//           <button onClick={toggleChartType}>
//             {chartType === "line"
//               ? "Switch to Bar Chart"
//               : "Switch to Line Chart"}
//           </button>
//           <ChartContainer config={chartConfig} className="h-[200px] w-full">
//             {chartType === "line" ? (
//               <LineChart data={data}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis
//                   dataKey="time"
//                   tickLine={false}
//                   tickMargin={10}
//                   axisLine={false}
//                   tickFormatter={(value) => value.slice(11, 16)}
//                 />
//                 <YAxis />
//                 <Tooltip content={<ChartTooltipContent />} />
//                 <Legend content={<ChartLegendContent />} />
//                 <Line type="monotone" dataKey="value" stroke="#8884d8" />
//               </LineChart>
//             ) : (
//               <BarChart data={data}>
//                 <CartesianGrid vertical={false} />
//                 <XAxis
//                   dataKey="time"
//                   tickLine={false}
//                   tickMargin={10}
//                   axisLine={false}
//                   tickFormatter={(value) => value.slice(11, 16)}
//                 />
//                 <Tooltip content={<ChartTooltipContent />} />
//                 <Legend content={<ChartLegendContent />} />
//                 <Bar dataKey="value" fill="var(--color-desktop)" radius={4} />
//               </BarChart>
//             )}
//           </ChartContainer>
//         </>
//       ) : (
//         <DataTable />
//       )}
//     </div>
//   );
// }

// export default ChartComponent;

// export function ChartComponent() {
//   const [chartType, setChartType] = useState<"line" | "bar">("line");

//   const toggleChartType = () => {
//     setChartType((prevType) => (prevType === "line" ? "bar" : "line"));
//   };

//   return (
//     <div>
//       <button onClick={toggleChartType}>
//         {chartType === "line" ? "Switch to Bar Chart" : "Switch to Line Chart"}
//       </button>
//       <ChartContainer config={chartConfig} className="h-[200px] w-full">
//         {chartType === "line" ? (
//           <LineChart data={data}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="time" />
//             <YAxis />
//             <Tooltip content={<ChartTooltipContent />} />
//             <Legend content={<ChartLegendContent />} />
//             <Line type="monotone" dataKey="value" stroke="#8884d8" />
//           </LineChart>
//         ) : (
//           <BarChart data={data}>
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="time"
//               tickLine={false}
//               tickMargin={10}
//               axisLine={false}
//               tickFormatter={(value) => value.slice(0, 10)}
//             />
//             <ChartTooltip content={<ChartTooltipContent />} />
//             <ChartLegend content={<ChartLegendContent />} />
//             <Bar dataKey="value" fill="var(--color-desktop)" radius={4} />
//           </BarChart>
//         )}
//       </ChartContainer>
//     </div>
//   );
// }

// export default ChartComponent;
