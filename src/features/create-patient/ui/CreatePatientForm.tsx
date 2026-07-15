"use client";

import { useCreatePatient } from "@/entities/patient";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createPatientSchema,
  type CreatePatientFormValues,
} from "../model/create-patient-schema";
import { toast } from 'sonner';

interface CreatePatientFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreatePatientForm({
  onSuccess,
  onCancel,
}: CreatePatientFormProps) {
  const { mutate, isPending, isError, error, reset } = useCreatePatient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePatientFormValues>({
    resolver: zodResolver(createPatientSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      birthDate: "",
      email: "",
      comment: "",
    },
  });

  const onSubmit = (values: CreatePatientFormValues) => {
    mutate(values, {
      onSuccess: () => {
        reset();
        toast.success("Пациент добавлен");
        onSuccess?.();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Имя" error={errors.firstName?.message}>
          <Input
            placeholder="Анна"
            aria-invalid={!!errors.firstName}
            {...register("firstName")}
          />
        </Field>

        <Field label="Фамилия" error={errors.lastName?.message}>
          <Input
            placeholder="Иванова"
            aria-invalid={!!errors.lastName}
            {...register("lastName")}
          />
        </Field>
      </div>

      <Field label="Телефон" error={errors.phone?.message}>
        <Input
          type="tel"
          placeholder="+7 (999) 123-45-67"
          aria-invalid={!!errors.phone}
          {...register("phone")}
        />
      </Field>

      <Field label="Дата рождения" error={errors.birthDate?.message}>
        <Input
          type="date"
          aria-invalid={!!errors.birthDate}
          {...register("birthDate")}
        />
      </Field>

      <Field label="Email" error={errors.email?.message}>
        <Input
          type="email"
          placeholder="anna@mail.ru"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
      </Field>

      <Field label="Комментарий" error={errors.comment?.message}>
        <Textarea
          placeholder="Аллергии, особенности..."
          rows={3}
          aria-invalid={!!errors.comment}
          {...register("comment")}
        />
      </Field>

      {isError && (
        <p className="text-destructive text-sm">
          {error.message || "Не удалось создать пациента"}
        </p>
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

interface FieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

function Field({ label, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
}
