"use client";

import {
  PAYMENT_STATUS,
  PAYMENT_STATUS_LABEL,
  useUpdatePayment,
  type Payment,
  type PaymentStatus,
} from "@/entities/payment";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { toast } from "sonner";

const STATUS_OPTIONS = Object.values(PAYMENT_STATUS);

interface ChangePaymentStatusProps {
  payment: Payment;
}

export function ChangePaymentStatus({ payment }: ChangePaymentStatusProps) {
  const { mutate, isPending } = useUpdatePayment();

  const handleChange = (value: string | null) => {
    if (!value || value === payment.status) return;

    const status = value as PaymentStatus;

    mutate(
      {
        id: payment.id,
        payload: {
          patientId: payment.patientId,
          amount: payment.amount,
          date: payment.date,
          status,
        },
      },
      {
        onSuccess: () => {
          toast.success("Статус обновлён");
        },
        onError: (error) => {
          toast.error(error.message || "Не удалось сменить статус");
        },
      },
    );
  };

  return (
    <Select
      value={payment.status}
      onValueChange={handleChange}
      disabled={isPending}
    >
      <SelectTrigger
        className="h-8 w-[160px]"
        size="sm"
        aria-label="Статус платежа"
      >
        <SelectValue>{PAYMENT_STATUS_LABEL[payment.status]}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {STATUS_OPTIONS.map((status) => (
          <SelectItem key={status} value={status}>
            {PAYMENT_STATUS_LABEL[status]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
