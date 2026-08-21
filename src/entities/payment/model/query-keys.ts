import { SortOrder } from "@/shared/types";

export interface PaymentListParams {
  patientId?: number;
  sort?: string;
  order?: SortOrder;
}

export const paymentKeys = {
  all: ["payments"] as const,
  lists: (params?: PaymentListParams) =>
    [...paymentKeys.all, "list", params ?? {}] as const,
  detail: (id: number) => [...paymentKeys.all, "detail", id] as const,
};
