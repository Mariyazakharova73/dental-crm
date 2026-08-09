"use client";

import { useAppointments } from "@/entities/appointment";
import { CreateAppointmentDialog } from "@/features/create-appointment";
import { SORT_ORDER } from "@/shared/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { PatientAppointmentItem } from "./PatientAppointmentItem";
import { PatientAppointmentsSkeleton } from "./PatientAppointmentsSkeleton";

interface PatientAppointmentsProps {
  patientId: number;
}

export function PatientAppointments({ patientId }: PatientAppointmentsProps) {
  const { data, isLoading, isError, error } = useAppointments({
    patientId,
    sort: "date",
    order: SORT_ORDER.DESC,
  });

  const appointments = data?.data ?? [];

  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl">Записи</CardTitle>
            <CardDescription>Приёмы этого пациента</CardDescription>
          </div>
          <CreateAppointmentDialog patientId={patientId} />
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        {isLoading && <PatientAppointmentsSkeleton />}

        {isError && (
          <p className="text-destructive text-sm">
            {error.message || "Не удалось загрузить записи"}
          </p>
        )}

        {!isLoading && !isError && appointments.length === 0 && (
          <p className="text-muted-foreground text-sm">Записей пока нет</p>
        )}

        {!isLoading && !isError && appointments.length > 0 && (
          <ul>
            {appointments.map((appointment) => (
              <PatientAppointmentItem
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
