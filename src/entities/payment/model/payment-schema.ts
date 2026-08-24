import { z } from "zod";
import { PAYMENT_STATUS } from "../types";

export const paymentFormSchema = z.object({
  patientId: z.number().int().positive(),
  amount: z
    .number({ error: "Укажите сумму" })
    .positive("Сумма должна быть больше 0"),
  date: z.string().min(1, "Укажите дату"),
  status: z.enum([
    PAYMENT_STATUS.PENDING,
    PAYMENT_STATUS.PARTIAL,
    PAYMENT_STATUS.PAID,
  ]),
});

export type PaymentFormValues = z.infer<typeof paymentFormSchema>;

export const emptyPaymentFormValues: PaymentFormValues = {
  patientId: 0,
  amount: 0,
  date: "",
  status: PAYMENT_STATUS.PENDING,
};
