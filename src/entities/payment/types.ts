import type { ValueOf } from "@/shared/types";

export const PAYMENT_STATUS = {
  PENDING: "pending",
  PARTIAL: "partial",
  PAID: "paid",
} as const;

export type PaymentStatus = ValueOf<typeof PAYMENT_STATUS>;

export interface Payment {
  id: number;
  patientId: number;
  amount: number;
  date: string;
  status: PaymentStatus;
}

export type CreatePaymentPayload = Omit<Payment, "id">;

export type UpdatePaymentPayload = CreatePaymentPayload;
