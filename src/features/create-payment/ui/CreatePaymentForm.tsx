"use client";

import {
  emptyPaymentFormValues,
  PaymentForm,
  useCreatePayment,
  type PaymentFormValues,
} from "@/entities/payment";
import { toast } from "sonner";

interface CreatePaymentFormProps {
  patientId: number;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreatePaymentForm({
  patientId,
  onSuccess,
  onCancel,
}: CreatePaymentFormProps) {
  const { mutate, isPending, isError, error, reset } = useCreatePayment();

  const onSubmit = (values: PaymentFormValues) => {
    mutate(values, {
      onSuccess: () => {
        reset();
        toast.success("Платёж добавлен");
        onSuccess?.();
      },
    });
  };

  return (
    <PaymentForm
      defaultValues={{
        ...emptyPaymentFormValues,
        patientId,
      }}
      onSubmit={onSubmit}
      onCancel={onCancel ?? (() => {})}
      isPending={isPending}
      errorMessage={
        isError ? error.message || "Не удалось создать платёж" : undefined
      }
    />
  );
}
