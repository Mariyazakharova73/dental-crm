import { addMinutes, parseISO } from "date-fns";
import { getFullName } from "@/entities/patient";
import type { AppointmentListItem } from "../types";
import { APPOINTMENT_STATUS } from "../types";

const DEFAULT_DURATION_MIN = 60;

const STATUS_COLOR = {
  [APPOINTMENT_STATUS.CREATED]: "#3b82f6",
  [APPOINTMENT_STATUS.CONFIRMED]: "#22c55e",
  [APPOINTMENT_STATUS.COMPLETED]: "#94a3b8",
  [APPOINTMENT_STATUS.CANCELLED]: "#ef4444",
} as const;

export function toCalendarEvent(
  appointment: AppointmentListItem,
  durationMinutes?: number,
) {
  const start = parseISO(appointment.date);
  const minutes = durationMinutes ?? DEFAULT_DURATION_MIN;

  const patientName = appointment.patient
    ? getFullName(appointment.patient)
    : "Пациент";
  const doctorName = appointment.doctor?.name ?? "Врач";

  return {
    id: String(appointment.id),
    title: `${patientName} · ${doctorName}`,
    start: appointment.date,
    end: addMinutes(start, minutes).toISOString(),
    backgroundColor: STATUS_COLOR[appointment.status],
  };
}