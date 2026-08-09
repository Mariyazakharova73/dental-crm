import type { ValueOf } from "@/shared/types";

export const APPOINTMENT_SORT_FIELD = {
  DATE: "date",
  DOCTOR: "doctor",
  PATIENT: "patient",
  STATUS: "status",
} as const;

export type AppointmentSortField = ValueOf<
  typeof APPOINTMENT_SORT_FIELD
>;
