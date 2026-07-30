import type { ValueOf } from "@/shared/types";

export const DOCTOR_SORT_FIELD = {
  NAME: "name",
  SPECIALIZATION: "specialization",
  EXPERIENCE: "experience",
} as const;

export type DoctorSortField = ValueOf<typeof DOCTOR_SORT_FIELD>;
