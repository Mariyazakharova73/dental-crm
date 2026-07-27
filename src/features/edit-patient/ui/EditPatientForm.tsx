"use client";

import {
  PatientForm,
  useUpdatePatient,
  type Patient,
  type PatientFormValues,
} from "@/entities/patient";
import { toast } from "sonner";

interface EditPatientFormProps {
  patient: Patient;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function EditPatientForm({
  patient,
  onSuccess,
  onCancel,
}: EditPatientFormProps) {
  const { mutate, isPending, isError, error, reset } = useUpdatePatient();

  const onSubmit = (values: PatientFormValues) => {
    mutate(
      { id: patient.id, payload: values },
      {
        onSuccess: () => {
          reset();
          toast.success("Данные пациента обновлены");
          onSuccess?.();
        },
      },
    );
  };

  return (
    <PatientForm
      defaultValues={{
        firstName: patient.firstName,
        lastName: patient.lastName,
        phone: patient.phone,
        birthDate: patient.birthDate,
        email: patient.email,
        comment: patient.comment,
      }}
      onSubmit={onSubmit}
      onCancel={onCancel}
      isPending={isPending}
      errorMessage={
        isError ? error.message || "Не удалось обновить пациента" : null
      }
    />
  );
}
