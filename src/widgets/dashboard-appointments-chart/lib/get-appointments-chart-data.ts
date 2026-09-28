import { APPOINTMENT_STATUS, type AppointmentListItem } from "@/entities/appointment";
import { format, isSameDay, parseISO, startOfDay, subDays } from "date-fns";

export interface AppointmentChartDataItem {
  date: string;
  count: number;
}

export function getAppointmentsChartData(
  appointments: AppointmentListItem[],
  now = new Date(),
): AppointmentChartDataItem[] {
  const today = startOfDay(now);

  return Array.from({ length: 7 }, (_, index) => {
    const date = subDays(today, 6 - index);
    const count = appointments.filter(
      (appointment) =>
        appointment.status !== APPOINTMENT_STATUS.CANCELLED &&
        isSameDay(parseISO(appointment.date), date),
    ).length;

    return {
      date: format(date, "dd.MM"),
      count,
    };
  });
}
