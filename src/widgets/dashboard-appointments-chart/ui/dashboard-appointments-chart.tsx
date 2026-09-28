"use client";

import { useAppointments } from "@/entities/appointment";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/shared/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { getAppointmentsChartData } from "../lib/get-appointments-chart-data";

const chartConfig = {
  count: {
    label: "Записи",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function DashboardAppointmentsChart() {
  const appointmentsQuery = useAppointments();
  const data = getAppointmentsChartData(appointmentsQuery.data?.data ?? []);
  const hasAppointments = data.some((item) => item.count > 0);

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="text-xl">Записи за неделю</CardTitle>
        <CardDescription>Количество приёмов за последние 7 дней</CardDescription>
      </CardHeader>

      <CardContent className="pt-4">
        {appointmentsQuery.isLoading && (
          <div className="bg-muted h-[280px] animate-pulse rounded-lg" />
        )}

        {appointmentsQuery.isError && (
          <p className="text-destructive text-sm">
            Не удалось загрузить данные для графика
          </p>
        )}

        {!appointmentsQuery.isLoading &&
          !appointmentsQuery.isError &&
          !hasAppointments && (
            <p className="text-muted-foreground flex h-[280px] items-center justify-center text-sm">
              Записей за последние 7 дней нет
            </p>
          )}

        {!appointmentsQuery.isLoading &&
          !appointmentsQuery.isError &&
          hasAppointments && (
            <ChartContainer config={chartConfig} className="h-[280px] w-full">
              <BarChart accessibilityLayer data={data}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                  width={28}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                  dataKey="count"
                  fill="var(--color-count)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          )}
      </CardContent>
    </Card>
  );
}
