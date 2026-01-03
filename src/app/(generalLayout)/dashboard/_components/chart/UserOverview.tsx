"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState } from "react";
import { userTypeOptions, yearOptions } from "@/data/global.data";
import { AFilterSelect } from "@/components/form/AFilterSelect";
import { useGetUserOverviewQuery } from "@/redux/api/dashboardApi";
import ASpinner from "@/components/ui/ASpinner";
import AErrorMessage from "@/components/AErrorMessage";

const chartConfig = {
  value: {
    label: "Users",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function UserOverview() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear.toString());
  const [role, setRole] = useState<string>("ALL");

  const { data, isLoading, isError, error, refetch } = useGetUserOverviewQuery({
    year,
    role: role === "ALL" ? "" : role,
  });

  const overview = data?.data;

  if (isLoading)
    return (
      <div className="bg-card rounded-xl p-6 px-8 mt-6 h-[470px] flex justify-center items-center">
        <ASpinner className="!bg-card p-6 px-8 rounded-xl" size={120} />
      </div>
    );
  if (isError)
    return (
      <div className="bg-card rounded-xl p-6 px-8 mt-6 h-[470px] flex justify-center items-center">
        <AErrorMessage
          error={error}
          className="!bg-card rounded-xl"
          onRetry={refetch}
        />
      </div>
    );
  const minValue = Math.min(...overview.map((item: any) => Number(item.users)));
  const maxValue = Math.max(...overview.map((item: any) => Number(item.users)));
  const yAxisDomain = [Math.floor(maxValue), Math.floor(minValue)];
  return (
    <div className="bg-card rounded-xl p-6 px-8 mt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary-foreground">
          User Overview
        </h1>
        <div className="flex items-center gap-4">
          <AFilterSelect
            onChange={setRole}
            placeholder={"user type"}
            value={role}
            options={userTypeOptions}
            className="!w-[110px]"
          />
          <AFilterSelect
            onChange={setYear}
            placeholder={currentYear.toString()}
            value={year}
            options={yearOptions}
            className="!w-[90px]"
          />
        </div>
      </div>

      {maxValue > 0 ? (
        <ChartContainer config={chartConfig} className="h-[320px] w-full mt-12">
          <AreaChart
            accessibilityLayer
            data={overview}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} stroke="#e0e0e0" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              domain={yAxisDomain}
              stroke="#636566"
              tickLine={false}
              axisLine={false}
              tickMargin={20}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value) => (
                    <div className="flex items-center justify-between w-full">
                      <p className="text-muted-foreground font-medium">
                        Users:{" "}
                      </p>
                      <p>{value}</p>
                    </div>
                  )}
                />
              }
            />
            <defs>
              <linearGradient id="fillUsers" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-value)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-value)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="users"
              type="monotone"
              fill="url(#fillUsers)"
              fillOpacity={0.6}
              stroke="var(--color-value)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      ) : (
        <div className="bg-card rounded-xl p-6 px-8 mt-6 h-[380px] flex justify-center items-center">
          <p className="text-muted-foreground">No data found!</p>
        </div>
      )}
    </div>
  );
}
