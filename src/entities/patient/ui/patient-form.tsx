"use client";

import { Nullable } from "@/shared/types";
import { Button } from "@/shared/ui/button";
import { FieldForm } from "@/shared/ui/field-form";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  patientFormSchema,
  type PatientFormValues,
} from "../model/patient-schema";

interface PatientFormProps {
  defaultValues: PatientFormValues;
  onSubmit: (values: PatientFormValues) => void;
  onCancel?: () => void;
  isPending?: boolean;
  errorMessage?: Nullable<string>;
}

export function PatientForm({
  defaultValues,
  onSubmit,
  onCancel,
  isPending = false,
  errorMessage,
}: PatientFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientFormValues>({
    resolver: zodResolver(patientFormSchema),
    mode: "onBlur",
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <FieldForm label="Фамилия" error={errors.lastName?.message}>
          <Input
            placeholder="Фамилия"
            aria-invalid={!!errors.lastName}
            {...register("lastName")}
          />
        </FieldForm>
        <FieldForm label="Имя" error={errors.firstName?.message}>
          <Input
            placeholder="Имя"
            aria-invalid={!!errors.firstName}
            {...register("firstName")}
          />
        </FieldForm>
      </div>

      <FieldForm label="Телефон" error={errors.phone?.message}>
        <Input
          type="tel"
          inputMode="tel"
          maxLength={12}
          placeholder="Телефон"
          aria-invalid={!!errors.phone}
          {...register("phone")}
        />
      </FieldForm>

      <FieldForm label="Дата рождения" error={errors.birthDate?.message}>
        <Input
          type="date"
          max={new Date().toISOString().slice(0, 10)}
          aria-invalid={!!errors.birthDate}
          {...register("birthDate")}
        />
      </FieldForm>

      <FieldForm label="Email" error={errors.email?.message}>
        <Input
          type="email"
          placeholder="Email"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
      </FieldForm>

      <FieldForm label="Комментарий" error={errors.comment?.message}>
        <Textarea
          placeholder="Комментарий"
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
