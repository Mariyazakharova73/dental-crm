"use client";

import { Nullable } from "@/shared/types";
import { Button } from "@/shared/ui/button";
import { FieldForm } from "@/shared/ui/field-form";
import { Input } from "@/shared/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import {
  doctorFormSchema,
  type DoctorFormValues,
} from "../model/doctor-schema";
import { DoctorScheduleFields } from "./doctor-schedule-fields";

interface DoctorFormProps {
  defaultValues: DoctorFormValues;
  onSubmit: (values: DoctorFormValues) => void;
  onCancel?: () => void;
  isPending?: boolean;
  errorMessage?: Nullable<string>;
}

export function DoctorForm({
  defaultValues,
  onSubmit,
  onCancel,
  isPending = false,
  errorMessage,
}: DoctorFormProps) {
  const form = useForm<DoctorFormValues>({
    resolver: zodResolver(doctorFormSchema),
    mode: "onBlur",
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FieldForm label="ФИО" error={errors.name?.message}>
          <Input
            placeholder="Смирнов Алексей Викторович"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
        </FieldForm>

        <FieldForm label="Специализация" error={errors.specialization?.message}>
          <Input
            placeholder="Терапевт"
            aria-invalid={!!errors.specialization}
            {...register("specialization")}
          />
        </FieldForm>

        <FieldForm label="Стаж (лет)" error={errors.experience?.message}>
          <Input
            type="number"
            inputMode="numeric"
            min={0}
            max={70}
            placeholder="10"
            aria-invalid={!!errors.experience}
            {...register("experience", { valueAsNumber: true })}
          />
        </FieldForm>

        <DoctorScheduleFields />

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
    </FormProvider>
  );
}
