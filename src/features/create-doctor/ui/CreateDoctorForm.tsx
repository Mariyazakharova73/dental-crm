"use client";

import {
  DoctorForm,
  emptyDoctorFormValues,
  toDoctorSchedule,
  useCreateDoctor,
  type DoctorFormValues,
} from "@/entities/doctor";
import { toast } from "sonner";

interface CreateDoctorFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreateDoctorForm({
  onSuccess,
  onCancel,
}: CreateDoctorFormProps) {
  const { mutate, isPending, isError, error, reset } = useCreateDoctor();

  const onSubmit = (values: DoctorFormValues) => {
    mutate(
      {
        name: values.name,
        specialization: values.specialization,
        experience: values.experience,
        schedule: toDoctorSchedule(values.schedule),
      },
      {
        onSuccess: () => {
          reset();
          toast.success("Врач добавлен");
          onSuccess?.();
        },
      },
    );
  };

  return (
    <DoctorForm
      defaultValues={emptyDoctorFormValues}
      onSubmit={onSubmit}
      onCancel={onCancel}
      isPending={isPending}
      errorMessage={
        isError ? error.message || "Не удалось создать врача" : null
      }
    />
  );
}
