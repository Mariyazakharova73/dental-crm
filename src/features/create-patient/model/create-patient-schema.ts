import { z } from "zod";

export const createPatientSchema = z.object({
  firstName: z.string().trim().min(1, "Введите имя"),
  lastName: z.string().trim().min(1, "Введите фамилию"),
  phone: z.string().trim().min(10, "Введите корректный телефон"),
  birthDate: z.iso.date("Укажите дату рождения"),
  email: z.email("Введите корректный email"),
  comment: z.string(),
});

export type CreatePatientFormValues = z.infer<typeof createPatientSchema>;
