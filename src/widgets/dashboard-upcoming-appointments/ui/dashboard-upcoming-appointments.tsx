"use client";

import {
  APPOINTMENT_STATUS_LABEL,
  type AppointmentStatus,
  useAppointments,
} from "@/entities/appointment";
import { getFullName } from "@/entities/patient";
import { useServices } from "@/entities/service";
import { routes } from "@/shared/config/routes";
import { formatDateTime } from "@/shared/lib/date/format-date";
import { Badge } from "@/shared/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { SORT_ORDER } from "@/shared/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getUpcomingAppointments } from "../lib/get-upcoming-appointments";

const UPCOMING_LIMIT = 5;

const appointmentStatusVariant: Record<
  AppointmentStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  created: "outline",
  confirmed: "secondary",
  completed: "default",
  cancelled: "destructive",
};

export function DashboardUpcomingAppointments() {
  const appointmentsQuery = useAppointments({
    sort: "date",
    order: SORT_ORDER.ASC,
  });
  const servicesQuery = useServices();

  const isLoading = appointmentsQuery.isLoading || servicesQuery.isLoading;
  const isError = appointmentsQuery.isError || servicesQuery.isError;
  const servicesById = new Map(
    (servicesQuery.data ?? []).map((service) => [service.id, service]),
  );
  const appointments = getUpcomingAppointments(
    appointmentsQuery.data?.data ?? [],
    new Date(),
    UPCOMING_LIMIT,
  );

  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-xl">Ближайшие записи</CardTitle>
            <CardDescription>Предстоящие приёмы клиники</CardDescription>
          </div>
          <Link
            href={routes.appointments}
            className="text-primary inline-flex shrink-0 items-center gap-1 text-sm font-medium hover:underline"
          >
            Все записи
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        {isLoading && (
          <div className="space-y-3" aria-label="Загрузка ближайших записей">
            {Array.from({ length: UPCOMING_LIMIT }, (_, index) => (
              <div
                key={index}
                className="space-y-2 border-b pb-3 last:border-0"
              >
                <div className="bg-muted h-4 w-32 animate-pulse rounded" />
                <div className="bg-muted h-3 w-48 animate-pulse rounded" />
              </div>
            ))}
          </div>
        )}

        {isError && (
          <p className="text-destructive text-sm">
            Не удалось загрузить ближайшие записи
          </p>
        )}

        {!isLoading && !isError && appointments.length === 0 && (
          <p className="text-muted-foreground text-sm">
            Ближайших записей нет
          </p>
        )}

        {!isLoading && !isError && appointments.length > 0 && (
          <ul>
            {appointments.map((appointment) => {
              const patientName = appointment.patient
                ? getFullName(appointment.patient)
                : `Пациент #${appointment.patientId}`;
              const doctorName =
                appointment.doctor?.name ?? `Врач #${appointment.doctorId}`;
              const serviceName =
                servicesById.get(appointment.serviceId)?.name ??
                "Услуга не найдена";

              return (
                <li
                  key={appointment.id}
                  className="flex flex-col gap-3 border-b py-3 first:pt-0 last:border-b-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0 space-y-1">
                    <p className="font-medium">
                      {formatDateTime(appointment.date)}
                    </p>
                    <p className="text-muted-foreground truncate text-sm">
                      <Link
                        href={routes.patient(appointment.patientId)}
                        className="text-foreground hover:text-primary font-medium transition-colors"
                      >
                        {patientName}
                      </Link>
                      <span> · {doctorName} · {serviceName}</span>
                    </p>
                  </div>
                  <Badge
                    variant={appointmentStatusVariant[appointment.status]}
                  >
                    {APPOINTMENT_STATUS_LABEL[appointment.status]}
                  </Badge>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
