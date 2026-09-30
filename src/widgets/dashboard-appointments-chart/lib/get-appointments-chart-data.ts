import { APPOINTMENT_STATUS, type AppointmentListItem } from "@/entities/appointment";
import {
  differenceInCalendarDays,
  format,
  isSameDay,
  parseISO,
  startOfDay,
  startOfMonth,
  subDays,
} from "date-fns";

export const APPOINTMENTS_CHART_PERIOD = {
  WEEK: "7-days",
  THIRTY_DAYS: "30-days",
  CURRENT_MONTH: "current-month",
} as const;

export type AppointmentsChartPeriod =
  (typeof APPOINTMENTS_CHART_PERIOD)[keyof typeof APPOINTMENTS_CHART_PERIOD];

export interface AppointmentChartDataItem {
  date: string;
  count: number;
}

export function getAppointmentsChartData(
  appointments: AppointmentListItem[],
  period: AppointmentsChartPeriod = APPOINTMENTS_CHART_PERIOD.WEEK,
  now = new Date(),
): AppointmentChartDataItem[] {
  const today = startOfDay(now);
  const startDate =
    period === APPOINTMENTS_CHART_PERIOD.CURRENT_MONTH
      ? startOfMonth(today)
      : subDays(today, period === APPOINTMENTS_CHART_PERIOD.WEEK ? 6 : 29);
  const daysCount = differenceInCalendarDays(today, startDate) + 1;

  return Array.from({ length: daysCount }, (_, index) => {
    const date = subDays(today, daysCount - 1 - index);
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
