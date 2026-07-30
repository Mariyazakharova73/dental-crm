import { SortOrder } from "@/shared/types";

export interface PatientListParams {
  q?: string;
  sort?: string;
  order?: SortOrder;
  page?: number;
  limit?: number;
};

export const patientKeys = {
  all: ["patients"] as const,
  lists: (params?: PatientListParams) =>
    [...patientKeys.all, "list", params ?? {}] as const,
  detail: (id: number) => [...patientKeys.all, "detail", id] as const,
};
