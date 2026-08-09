"use client";

import {
  APPOINTMENT_STATUS,
  AppointmentForm,
  emptyAppointmentFormValues,
  useCreateAppointment,
  type AppointmentFormValues,
} from "@/entities/appointment";
import { toast } from "sonner";

interface CreateAppointmentFormProps {
  patientId?: number;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreateAppointmentForm({
  patientId,
  onSuccess,
  onCancel,
}: CreateAppointmentFormProps) {
  const { mutate, isPending, isError, error, reset } = useCreateAppointment();

  const onSubmit = (values: AppointmentFormValues) => {
    mutate(
      { ...values, status: APPOINTMENT_STATUS.CREATED },
      {
        onSuccess: () => {
          reset();
          toast.success("Запись создана");
          onSuccess?.();
        },
      },
    );
  };

  return (
    <AppointmentForm
      defaultValues={{
        ...emptyAppointmentFormValues,
        ...(patientId ? { patientId } : {}),
      }}
      lockPatient={Boolean(patientId)}
      onSubmit={onSubmit}
      onCancel={onCancel}
      isPending={isPending}
      errorMessage={
        isError ? error.message || "Не удалось создать запись" : null
      }
    />
  );
}
