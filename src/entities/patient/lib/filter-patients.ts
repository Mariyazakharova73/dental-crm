import type { Patient } from "../types";
import {
  PATIENT_COMMENT_FILTER,
  PatientCommentFilter,
} from "./patient-comment-filter";

export function filterPatients(
  patients: Patient[],
  query: string,
  commentFilter: PatientCommentFilter = PATIENT_COMMENT_FILTER.ALL,
): Patient[] {
  let result = patients;

  if (commentFilter === PATIENT_COMMENT_FILTER.WITH_COMMENT) {
    result = result.filter((p) => p.comment.trim().length > 0);
  } else if (commentFilter === PATIENT_COMMENT_FILTER.WITHOUT_COMMENT) {
    result = result.filter((p) => !p.comment.trim());
  }

  const q = query.trim().toLowerCase();
  if (!q) return result;

  return result.filter((p) =>
    [p.firstName, p.lastName, p.phone, p.email, p.comment]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
}
