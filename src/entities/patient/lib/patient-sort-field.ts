import type { ValueOf } from "@/shared/types";

export const PATIENT_SORT_FIELD = {
  NAME: "name",
  BIRTH_DATE: "birthDate",
  EMAIL: "email",
} as const;

export type PatientSortField = ValueOf<typeof PATIENT_SORT_FIELD>;
