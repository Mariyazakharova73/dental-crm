import { SORT_ORDER, SortOrder } from "@/shared/types";
import type { Patient } from "../types";
import { getFullName } from "./getPatientData";
import type { PatientSortField } from "./patient-sort-field";
import { PATIENT_SORT_FIELD } from "./patient-sort-field";

export function sortPatients(
  patients: Patient[],
  field: PatientSortField,
  direction: SortOrder,
): Patient[] {
  const sorted = [...patients].sort((a, b) => {
    let cmp = 0;

    switch (field) {
      case PATIENT_SORT_FIELD.NAME:
        cmp = getFullName(a).localeCompare(getFullName(b), "ru");
        break;
      case PATIENT_SORT_FIELD.BIRTH_DATE:
        cmp = a.birthDate.localeCompare(b.birthDate);
        break;
      case PATIENT_SORT_FIELD.EMAIL:
        cmp = a.email.localeCompare(b.email, "ru");
        break;
    }

    return direction === SORT_ORDER.ASC ? cmp : -cmp;
  });

  return sorted;
}
