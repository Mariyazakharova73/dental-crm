import {
  APPOINTMENT_STATUS,
  type AppointmentListItem,
} from "@/entities/appointment";

export function getUpcomingAppointments(
  appointments: AppointmentListItem[],
  now = new Date(),
  limit = 5,
) {
  return appointments
    .filter(
      (appointment) =>
        appointment.status !== APPOINTMENT_STATUS.CANCELLED &&
        new Date(appointment.date) >= now,
    )
    .sort(
      (first, second) =>
        new Date(first.date).getTime() - new Date(second.date).getTime(),
    )
    .slice(0, limit);
}
