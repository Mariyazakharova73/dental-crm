import type { DoctorSchedule, Weekday } from "../types";
import { WEEKDAY_ORDER } from "./weekdays";

export interface DayScheduleFormValue {
  enabled: boolean;
  start: string;
  end: string;
}

export type DoctorScheduleFormValue = Record<Weekday, DayScheduleFormValue>;

export const TIME_HH_MM_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;

export const DEFAULT_SCHEDULE_START = "09:00";
export const DEFAULT_SCHEDULE_SLOT_MINUTES = 30;

export function addMinutesToTime(time: string, minutes: number): string {
  if (!TIME_HH_MM_REGEX.test(time)) return time;

  const [hours, mins] = time.split(":").map(Number);
  const total = (hours * 60 + mins + minutes + 24 * 60) % (24 * 60);
  const nextHours = Math.floor(total / 60);
  const nextMins = total % 60;

  return `${String(nextHours).padStart(2, "0")}:${String(nextMins).padStart(2, "0")}`;
}

export function createDayScheduleFormValue(
  enabled = false,
  start = DEFAULT_SCHEDULE_START,
  end = addMinutesToTime(start, DEFAULT_SCHEDULE_SLOT_MINUTES),
): DayScheduleFormValue {
  return { enabled, start, end };
}

export function createEmptyScheduleFormValue(): DoctorScheduleFormValue {
  return Object.fromEntries(
    WEEKDAY_ORDER.map((day) => [
      day,
      createDayScheduleFormValue(day !== "saturday" && day !== "sunday"),
    ]),
  ) as DoctorScheduleFormValue;
}

export function toDoctorScheduleFormValue(
  schedule: DoctorSchedule,
): DoctorScheduleFormValue {
  return Object.fromEntries(
    WEEKDAY_ORDER.map((day) => {
      const interval = schedule[day];
      if (!interval) {
        return [day, createDayScheduleFormValue(false)];
      }
      return [day, createDayScheduleFormValue(true, interval[0], interval[1])];
    }),
  ) as DoctorScheduleFormValue;
}

export function toDoctorSchedule(
  schedule: DoctorScheduleFormValue,
): DoctorSchedule {
  const result: DoctorSchedule = {};

  for (const day of WEEKDAY_ORDER) {
    const daySchedule = schedule[day];
    if (!daySchedule.enabled) continue;
    result[day] = [daySchedule.start, daySchedule.end];
  }

  return result;
}
