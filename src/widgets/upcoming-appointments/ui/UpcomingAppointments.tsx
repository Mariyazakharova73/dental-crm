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
import { UpcomingAppointmentItem } from "./UpcomingAppointmentItem";
import { UpcomingAppointmentsSkeleton } from "./UpcomingAppointmentsSkeleton";

const UPCOMING_LIMIT = 7;

function getTodayDateString() {
  return new Date().toISOString().slice(0, 10);
}

export function UpcomingAppointments() {
  const { data, isLoading, isError } = useAppointments({
    sort: "date",
    order: SORT_ORDER.ASC,
  });

  const today = getTodayDateString();
  const upcoming = (data?.data ?? [])
    .filter(
      (appointment) =>
        appointment.date.slice(0, 10) >= today &&
        appointment.status !== APPOINTMENT_STATUS.CANCELLED &&
        appointment.status !== APPOINTMENT_STATUS.COMPLETED,
    )
    .slice(0, UPCOMING_LIMIT);

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="text-xl">Ближайшие записи</CardTitle>
        <CardDescription>Предстоящие приёмы клиники</CardDescription>
      </CardHeader>

      <CardContent className="pt-4">
        {isLoading && <UpcomingAppointmentsSkeleton />}

        {isError && (
          <p className="text-destructive text-sm">
            Не удалось загрузить записи
          </p>
        )}

        {!isLoading && !isError && upcoming.length === 0 && (
          <p className="text-muted-foreground text-sm">
            Ближайших записей нет
          </p>
        )}

        {!isLoading && !isError && upcoming.length > 0 && (
          <ul>
            {upcoming.map((appointment) => (
              <UpcomingAppointmentItem
                key={appointment.id}
                appointment={appointment}
              />
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}