import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/features/visualization/components/data-table";
import { useTable } from "@/features/visualization/hooks/use-table";

export function Visualization() {
  const table = useTable();
  return (
    <Card className="h-full w-full overflow-y-scroll border-none">
      <Tabs defaultValue="table">
        <div className="flex items-center justify-between px-8 py-4">
          <div className="flex flex-col justify-center gap-1 p-0">
            <TabsList>
              <TabsTrigger value="table" className="text-xs font-semibold">
                Table
              </TabsTrigger>
              <TabsTrigger value="line" className="text-xs font-semibold">
                Line Chart
              </TabsTrigger>
              <TabsTrigger value="bar" className="text-xs font-semibold">
                Bar Chart
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="table" className="mt-0">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Filter rooms..."
                value={
                  (table.getColumn("room")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) => {
                  table?.getColumn("room")?.setFilterValue(event.target.value);
                }}
                className="max-w-[150px] text-xs font-medium"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="px-3 text-xs">
                    Columns <ChevronDownIcon className="ml-4 h-4 w-4" />
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
                          {column.id
                            .replace("_", " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </TabsContent>
        </div>
        <TabsContent value="table" className="mt-0">
          <CardContent className="px-8 pb-0">
            <DataTable table={table} />
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
