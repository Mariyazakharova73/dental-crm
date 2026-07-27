"use client";

import {
  emptyPatientFormValues,
  PatientForm,
  useCreatePatient,
  type PatientFormValues,
} from "@/entities/patient";
import { toast } from "sonner";

interface CreatePatientFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreatePatientForm({
  onSuccess,
  onCancel,
}: CreatePatientFormProps) {
  const { mutate, isPending, isError, error, reset } = useCreatePatient();

  const onSubmit = (values: PatientFormValues) => {
    mutate(values, {
      onSuccess: () => {
        reset();
        toast.success("Пациент добавлен");
        onSuccess?.();
      },
    });
  };

  return (
    <PatientForm
      defaultValues={emptyPatientFormValues}
      onSubmit={onSubmit}
      onCancel={onCancel}
      isPending={isPending}
      errorMessage={
        isError ? error.message || "Не удалось создать пациента" : null
      }
    />
  );
}
