"use client";

import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  APPOINTMENTS_CHART_PERIOD,
  getAppointmentsChartData,
  type AppointmentsChartPeriod,
} from "../lib/get-appointments-chart-data";

const chartConfig = {
  count: {
    label: "Записи",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function DashboardAppointmentsChart() {
  const [period, setPeriod] = useState<AppointmentsChartPeriod>(
    APPOINTMENTS_CHART_PERIOD.WEEK,
  );
  const appointmentsQuery = useAppointments();
  const data = getAppointmentsChartData(
    appointmentsQuery.data?.data ?? [],
    period,
  );
  const hasAppointments = data.some((item) => item.count > 0);

  const periodLabel =
    period === APPOINTMENTS_CHART_PERIOD.WEEK
      ? "Последние 7 дней"
      : period === APPOINTMENTS_CHART_PERIOD.THIRTY_DAYS
        ? "Последние 30 дней"
        : "Текущий месяц";

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 border-b sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <CardTitle className="text-xl">Записи</CardTitle>
          <CardDescription>Количество приёмов: {periodLabel.toLowerCase()}</CardDescription>
        </div>
        <Select
          value={period}
          onValueChange={(value) => {
            if (value) {
              setPeriod(value as AppointmentsChartPeriod);
            }
          }}
        >
          <SelectTrigger size="sm" aria-label="Период графика">
            <SelectValue>{periodLabel}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={APPOINTMENTS_CHART_PERIOD.WEEK}>
              Последние 7 дней
            </SelectItem>
            <SelectItem value={APPOINTMENTS_CHART_PERIOD.THIRTY_DAYS}>
              Последние 30 дней
            </SelectItem>
            <SelectItem value={APPOINTMENTS_CHART_PERIOD.CURRENT_MONTH}>
              Текущий месяц
            </SelectItem>
          </SelectContent>
        </Select>
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
                  interval={period === APPOINTMENTS_CHART_PERIOD.WEEK ? 0 : 4}
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
