import { z } from "zod";

export const appointmentFormSchema = z.object({
  patientId: z.number().int().positive("Выберите пациента"),
  doctorId: z.number().int().positive("Выберите врача"),
  serviceId: z.number().int().positive("Выберите услугу"),
  date: z.string().min(1, "Укажите дату и время"),
  comment: z.string(),
});

export type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

export const emptyAppointmentFormValues: AppointmentFormValues = {
  patientId: 0,
  doctorId: 0,
  serviceId: 0,
  date: "",
  comment: "",
};