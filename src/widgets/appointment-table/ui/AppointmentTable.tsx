"use client";

import {
  type AppointmentListItem,
  useAppointments,
} from "@/entities/appointment";
import { useMemo } from "react";
import { AppointmentTableView } from "./AppointmentTableView";

const EMPTY_APPOINTMENTS: AppointmentListItem[] = [];

export function AppointmentTable() {
  const { data, isLoading, isError, error } = useAppointments();

  const appointments = useMemo(() => {
    const list = data ?? EMPTY_APPOINTMENTS;
    return [...list].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [data]);

  return (
    <div className="flex flex-col gap-4">
      {isError && (
        <p className="text-destructive text-sm">
          {error.message || "Не удалось загрузить записи"}
        </p>
      )}

      <AppointmentTableView
        appointments={appointments}
        isLoading={isLoading}
      />
    </div>
  );
}
