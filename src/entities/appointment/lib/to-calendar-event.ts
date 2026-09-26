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

function formatInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) return parts[0] ?? name;

  return `${parts[0]} ${parts
    .slice(1)
    .map((part) => `${part[0]}.`)
    .join(" ")}`;
}

export function toCalendarEvent(
  appointment: AppointmentListItem,
  durationMinutes?: number,
) {
  const start = parseISO(appointment.date);
  const minutes = durationMinutes ?? DEFAULT_DURATION_MIN;
  const isPastAppointment = start.getTime() < Date.now();

  const patientName = appointment.patient
    ? formatInitials(getFullName(appointment.patient))
    : "Пациент";
  const doctorName = appointment.doctor
    ? formatInitials(appointment.doctor.name)
    : "Врач";

  return {
    id: String(appointment.id),
    title: `${doctorName} · ${patientName}`,
    start: appointment.date,
    end: addMinutes(start, minutes).toISOString(),
    backgroundColor: STATUS_COLOR[appointment.status],
    classNames: isPastAppointment ? ["is-past"] : undefined,
  };
}
