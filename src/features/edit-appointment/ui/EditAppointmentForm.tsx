"use client";

import {
  AppointmentForm,
  useUpdateAppointment,
  type Appointment,
  type AppointmentFormValues,
} from "@/entities/appointment";
import { toast } from "sonner";

interface EditAppointmentFormProps {
  appointment: Appointment;
  onSuccess?: () => void;
  onCancel?: () => void;
}

function toDatetimeLocalValue(date: string): string {
  return date.length >= 16 ? date.slice(0, 16) : date;
}

export function EditAppointmentForm({
  appointment,
  onSuccess,
  onCancel,
}: EditAppointmentFormProps) {
  const { mutate, isPending, isError, error, reset } = useUpdateAppointment();

  const onSubmit = (values: AppointmentFormValues) => {
    mutate(
      {
        id: appointment.id,
        payload: { ...values, status: appointment.status },
      },
      {
        onSuccess: () => {
          reset();
          toast.success("Запись обновлена");
          onSuccess?.();
        },
      },
    );
  };

  return (
    <AppointmentForm
      defaultValues={{
        patientId: appointment.patientId,
        doctorId: appointment.doctorId,
        serviceId: appointment.serviceId,
        date: toDatetimeLocalValue(appointment.date),
        comment: appointment.comment,
      }}
      onSubmit={onSubmit}
      onCancel={onCancel}
      isPending={isPending}
      errorMessage={
        isError ? error.message || "Не удалось обновить запись" : null
      }
    />
  );
}
