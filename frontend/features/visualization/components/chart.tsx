"use client";

import * as React from "react";

import {
  Bar,
  BarChart as RechartsBarChart,
  Line,
  LineChart as RechartsLineChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { useStore } from "zustand";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useDateRange } from "@/features/flow/hooks/use-date-range";
import { useQueryData } from "@/features/visualization/hooks/use-query-data";

const chartConfig = {
  value: {
    label: "Value",
  },
  humidity: {
    label: "Humidity",
    color: "hsl(var(--chart-1))",
  },
  temperature: {
    label: "Temperature",
    color: "hsl(var(--chart-2))",
  },
  carbon: {
    label: "Carbon Dioxide Level",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function Chart({ type }: { type: "line" | "bar" }) {
  const { dateRange } = useStore(useDateRange, (state) => ({
    dateRange: state.dateRange,
  }));
  const chartData = useQueryData();

  const fields = React.useMemo(
    () =>
      chartData?.reduce((acc, cur) => acc.add(cur.label), new Set<string>()),
    [chartData],
  );

  const [activeChart, setActiveChart] = React.useState<
    keyof typeof chartConfig
  >(Array.from(fields)[0] as keyof typeof chartConfig);

  React.useEffect(() => {
    if (fields.size > 0) {
      setActiveChart(Array.from(fields)[0] as keyof typeof chartConfig);
    }
  }, [chartData, fields]);

  const sum = React.useMemo(() => {
    return {
      humidity: chartData?.reduce(
        (acc, curr) =>
          curr.label === "humidity" ? acc + parseFloat(curr.value) : acc,
        0,
      ),
      temperature: chartData?.reduce(
        (acc, curr) =>
          curr.label === "temperature" ? acc + parseFloat(curr.value) : acc,
        0,
      ),
      carbon: chartData?.reduce(
        (acc, curr) =>
          curr.label === "carbon" ? acc + parseFloat(curr.value) : acc,
        0,
      ),
    };
  }, [chartData]);

  const counts = React.useMemo(() => {
    return {
      humidity: chartData?.filter((row) => row.label === "humidity").length,
      temperature: chartData?.filter((row) => row.label === "temperature")
        .length,
      carbon: chartData?.filter((row) => row.label === "carbon").length,
    };
  }, [chartData]);

  const average = React.useMemo(() => {
    return Object.entries(counts).reduce(
      (acc, [key, count]) => {
        acc[key as keyof typeof acc] = sum[key as keyof typeof sum] / count;
        return acc;
      },
      {} as Record<keyof typeof counts, number>,
    );
  }, [counts, sum]);

  const chartComponents = {
    line: RechartsLineChart,
    bar: RechartsBarChart,
  };

  const ChartComponent = chartComponents[type];

  const chartComponentData = React.useMemo(() => {
    return chartData
      .filter((row) => row.label === activeChart)
      .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
  }, [chartData, activeChart]);

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle className="capitalize">
            {chartConfig[activeChart]?.label}
          </CardTitle>
          <CardDescription>
            Showing data {dateRange.includes("-") ? "for " : "from "}
            {dateRange}
          </CardDescription>
        </div>
        <div className="flex">
          {Array.from(fields).map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  Avg. {chartConfig[chart]?.label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {average[chart as keyof typeof average]?.toFixed(2)}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[170px] w-full"
        >
          <ChartComponent
            dataKey={activeChart}
            data={chartComponentData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={3}
            />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return (
                  date.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  }) +
                  " " +
                  date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                );
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey={activeChart}
                  labelFormatter={(value) => {
                    {
                      const date = new Date(value);
                      return (
                        date.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        }) +
                        " " +
                        date.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      );
                    }
                  }}
                />
              }
            />
            {type === "line" ? (
              <Line
                dataKey="value"
                type="monotone"
                stroke={`var(--color-${activeChart})`}
                dot={false}
                strokeWidth={2}
              />
            ) : (
              <Bar dataKey="value" fill={`var(--color-${activeChart})`} />
            )}
          </ChartComponent>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
