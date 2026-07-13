import type { ValueOf } from "@/shared/types";
export const PATIENT_COMMENT_FILTER = {
  ALL: "all",
  WITH_COMMENT: "with_comment",
  WITHOUT_COMMENT: "without_comment",
} as const;

export type PatientCommentFilter = ValueOf<typeof PATIENT_COMMENT_FILTER>;
