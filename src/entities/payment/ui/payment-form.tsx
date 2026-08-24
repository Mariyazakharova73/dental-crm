"use client";

import { Button } from "@/shared/ui/button";
import { FieldForm } from "@/shared/ui/field-form";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { PAYMENT_STATUS_LABEL } from "../lib/payment-status-label";
import {
  paymentFormSchema,
  type PaymentFormValues,
} from "../model/payment-schema";
import { PAYMENT_STATUS } from "../types";

const STATUS_OPTIONS = Object.values(PAYMENT_STATUS);

interface PaymentFormProps {
  defaultValues: PaymentFormValues;
  onSubmit: (data: PaymentFormValues) => void;
  onCancel: () => void;
  isPending?: boolean;
  errorMessage?: string;
}

export function PaymentForm({
  defaultValues,
  onSubmit,
  onCancel,
  isPending = false,
  errorMessage,
}: PaymentFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    mode: "onBlur",
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FieldForm label="Сумма, ₽" error={errors.amount?.message}>
        <Input
          type="number"
          min={1}
          step={1}
          placeholder="3500"
          aria-invalid={!!errors.amount}
          {...register("amount")}
        />
      </FieldForm>

      <FieldForm label="Дата" error={errors.date?.message}>
        <Input type="date" aria-invalid={!!errors.date} {...register("date")} />
      </FieldForm>

      <FieldForm label="Статус" error={errors.status?.message}>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full" aria-invalid={!!errors.status}>
                <SelectValue placeholder="Статус">
                  {PAYMENT_STATUS_LABEL[field.value]}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status} value={status}>
                    {PAYMENT_STATUS_LABEL[status]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </FieldForm>

      {errorMessage && (
        <p className="text-destructive text-sm">{errorMessage}</p>
      )}

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Отмена
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Сохранение..." : "Сохранить"}
        </Button>
      </div>
    </form>
  );
}
