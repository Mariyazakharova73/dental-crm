"use client";

import {
  PaymentForm,
  useUpdatePayment,
  type Payment,
  type PaymentFormValues,
} from "@/entities/payment";
import { toast } from "sonner";

interface EditPaymentFormProps {
  payment: Payment;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function EditPaymentForm({
  payment,
  onSuccess,
  onCancel,
}: EditPaymentFormProps) {
  const { mutate, isPending, isError, error, reset } = useUpdatePayment();

  const onSubmit = (values: PaymentFormValues) => {
    mutate(
      {
        id: payment.id,
        payload: values,
      },
      {
        onSuccess: () => {
          reset();
          toast.success("Платёж обновлён");
          onSuccess?.();
        },
      },
    );
  };

  return (
    <PaymentForm
      defaultValues={{
        patientId: payment.patientId,
        amount: payment.amount,
        date: payment.date,
        status: payment.status,
      }}
      onSubmit={onSubmit}
      onCancel={onCancel ?? (() => {})}
      isPending={isPending}
      errorMessage={
        isError ? error.message || "Не удалось обновить платёж" : undefined
      }
    />
  );
}
