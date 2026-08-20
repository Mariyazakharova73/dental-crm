"use client";

import {
  APPOINTMENT_STATUS,
  useAppointments,
} from "@/entities/appointment";
import { SORT_ORDER } from "@/shared/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

type EntityOverviewSummaryProps = {
  description: string;
} & (
  | { patientId: number; doctorId?: never }
  | { doctorId: number; patientId?: never }
);

function getTodayDateString() {
  return new Date().toISOString().slice(0, 10);
}

export function EntityOverviewSummary({
  description,
  patientId,
  doctorId,
}: EntityOverviewSummaryProps) {
  const { data, isLoading, isError } = useAppointments({
    patientId,
    doctorId,
    sort: "date",
    order: SORT_ORDER.DESC,
  });

  const appointments = data?.data ?? [];
  const today = getTodayDateString();

  const upcomingCount = appointments.filter(
    (appointment) =>
      appointment.date >= today &&
      appointment.status !== APPOINTMENT_STATUS.CANCELLED &&
      appointment.status !== APPOINTMENT_STATUS.COMPLETED,
  ).length;

  const completedCount = appointments.filter(
    (appointment) => appointment.status === APPOINTMENT_STATUS.COMPLETED,
  ).length;

  const stats = [
    { label: "Всего записей", value: appointments.length },
    { label: "Предстоящие", value: upcomingCount },
    { label: "Завершённые", value: completedCount },
  ];

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="text-xl">Сводка</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="pt-4">
        {isLoading && (
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-7 w-12" />
              </div>
            ))}
          </div>
        )}

        {isError && (
          <p className="text-destructive text-sm">
            Не удалось загрузить сводку
          </p>
        )}

        {!isLoading && !isError && (
          <dl className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-muted-foreground text-xs">{stat.label}</dt>
                <dd className="text-2xl font-semibold">{stat.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </CardContent>
    </Card>
  );
}
