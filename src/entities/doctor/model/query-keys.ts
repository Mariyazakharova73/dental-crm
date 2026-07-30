import { SortOrder } from "@/shared/types";

export interface DoctorListParams {
  q?: string;
  sort?: string;
  order?: SortOrder;
  page?: number;
  limit?: number;
};

export const doctorKeys = {
  all: ["doctors"] as const,
  lists: (params?: DoctorListParams) =>
    [...doctorKeys.all, "list", params ?? {}] as const,
  detail: (id: number) => [...doctorKeys.all, "detail", id] as const,
};
