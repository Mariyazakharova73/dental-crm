"use client";

import {
  DoctorForm,
  toDoctorSchedule,
  toDoctorScheduleFormValue,
  useUpdateDoctor,
  type Doctor,
  type DoctorFormValues,
} from "@/entities/doctor";
import { toast } from "sonner";

interface EditDoctorFormProps {
  doctor: Doctor;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function EditDoctorForm({
  doctor,
  onSuccess,
  onCancel,
}: EditDoctorFormProps) {
  const { mutate, isPending, isError, error, reset } = useUpdateDoctor();

  const onSubmit = (values: DoctorFormValues) => {
    mutate(
      {
        id: doctor.id,
        payload: {
          name: values.name,
          specialization: values.specialization,
          experience: values.experience,
          schedule: toDoctorSchedule(values.schedule),
        },
      },
      {
        onSuccess: () => {
          reset();
          toast.success("Данные врача обновлены");
          onSuccess?.();
        },
      },
    );
  };

  return (
    <DoctorForm
      defaultValues={{
        name: doctor.name,
        specialization: doctor.specialization,
        experience: doctor.experience,
        schedule: toDoctorScheduleFormValue(doctor.schedule),
      }}
      onSubmit={onSubmit}
      onCancel={onCancel}
      isPending={isPending}
      errorMessage={
        isError ? error.message || "Не удалось обновить врача" : null
      }
    />
  );
}
