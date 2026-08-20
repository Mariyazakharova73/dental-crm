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
import { EntityAppointmentItem } from "./EntityAppointmentItem";
import { EntityAppointmentsSkeleton } from "./EntityAppointmentsSkeleton";

type EntityAppointmentsListProps = {
  description: string;
  counterparty: "doctor" | "patient";
} & (
  | { patientId: number; doctorId?: never }
  | { doctorId: number; patientId?: never }
);

export function EntityAppointmentsList({
  description,
  counterparty,
  patientId,
  doctorId,
}: EntityAppointmentsListProps) {
  const { data, isLoading, isError, error } = useAppointments({
    patientId,
    doctorId,
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
            <CardDescription>{description}</CardDescription>
          </div>
          <CreateAppointmentDialog patientId={patientId} doctorId={doctorId} />
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        {isLoading && <EntityAppointmentsSkeleton />}

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
              <EntityAppointmentItem
                key={appointment.id}
                appointment={appointment}
                counterparty={counterparty}
              />
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
