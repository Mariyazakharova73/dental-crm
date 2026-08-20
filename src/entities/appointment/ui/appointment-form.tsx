"use client";

import { useDoctors } from "@/entities/doctor";
import { getFullName, usePatients } from "@/entities/patient";
import { useServices } from "@/entities/service";
import type { Nullable } from "@/shared/types";
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
import { Textarea } from "@/shared/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  appointmentFormSchema,
  type AppointmentFormValues,
} from "../model/appointment-schema";

interface AppointmentFormProps {
  defaultValues: AppointmentFormValues;
  onSubmit: (values: AppointmentFormValues) => void;
  onCancel?: () => void;
  isPending?: boolean;
  lockPatient?: boolean;
  lockDoctor?: boolean;
  errorMessage?: Nullable<string>;
}

export function AppointmentForm({
  defaultValues,
  onSubmit,
  onCancel,
  isPending = false,
  lockPatient = false,
  lockDoctor = false,
  errorMessage,
}: AppointmentFormProps) {
  const { data: patientsData } = usePatients({ limit: 100 });
  const { data: doctorsData } = useDoctors({ limit: 100 });
  const { data: services = [] } = useServices();

  const patients = patientsData?.data ?? [];
  const doctors = doctorsData?.data ?? [];

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    mode: "onBlur",
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FieldForm label="Пациент" error={errors.patientId?.message}>
        <Controller
          name="patientId"
          control={control}
          render={({ field }) => {
            const selected = patients.find((p) => p.id === field.value);
            return (
              <Select
                value={field.value > 0 ? String(field.value) : ""}
                onValueChange={(value) => field.onChange(Number(value))}
                disabled={lockPatient}
              >
                <SelectTrigger
                  className="w-full"
                  aria-invalid={!!errors.patientId}
                >
                  <SelectValue placeholder="Выберите пациента">
                    {selected ? getFullName(selected) : null}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {patients.map((patient) => (
                    <SelectItem key={patient.id} value={String(patient.id)}>
                      {getFullName(patient)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
          }}
        />
      </FieldForm>

      <FieldForm label="Врач" error={errors.doctorId?.message}>
        <Controller
          name="doctorId"
          control={control}
          render={({ field }) => {
            const selected = doctors.find((d) => d.id === field.value);
            return (
              <Select
                value={field.value > 0 ? String(field.value) : ""}
                onValueChange={(value) => field.onChange(Number(value))}
                disabled={lockDoctor}
              >
                <SelectTrigger
                  className="w-full"
                  aria-invalid={!!errors.doctorId}
                >
                  <SelectValue placeholder="Выберите врача">
                    {selected?.name ?? null}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={String(doctor.id)}>
                      {doctor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
          }}
        />
      </FieldForm>

      <FieldForm label="Услуга" error={errors.serviceId?.message}>
        <Controller
          name="serviceId"
          control={control}
          render={({ field }) => {
            const selected = services.find((s) => s.id === field.value);
            return (
              <Select
                value={field.value > 0 ? String(field.value) : ""}
                onValueChange={(value) => field.onChange(Number(value))}
              >
                <SelectTrigger
                  className="w-full"
                  aria-invalid={!!errors.serviceId}
                >
                  <SelectValue placeholder="Выберите услугу">
                    {selected?.name ?? null}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={String(service.id)}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
          }}
        />
      </FieldForm>

      <FieldForm label="Дата и время" error={errors.date?.message}>
        <Input
          type="datetime-local"
          aria-invalid={!!errors.date}
          {...register("date")}
        />
      </FieldForm>

      <FieldForm label="Комментарий" error={errors.comment?.message}>
        <Textarea
          placeholder="Пожелания, особенности..."
          rows={3}
          aria-invalid={!!errors.comment}
          {...register("comment")}
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
