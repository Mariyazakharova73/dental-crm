import { EMAIL_REGEX, PHONE_RU_REGEX } from "@/shared/lib/validation/regex";
import { z } from "zod";

export const patientFormSchema = z.object({
  firstName: z.string().trim().min(1, "Введите имя"),
  lastName: z.string().trim().min(1, "Введите фамилию"),
  phone: z
    .string()
    .trim()
    .regex(
      PHONE_RU_REGEX,
      "Введите телефон в формате +79991234567 или 89991234567",
    ),
  birthDate: z.iso
    .date("Укажите дату рождения")
    .refine((date) => date <= new Date().toISOString().slice(0, 10), {
      message: "Дата рождения не может быть в будущем",
    }),
  email: z.string().trim().regex(EMAIL_REGEX, "Введите корректный email"),
  comment: z.string(),
});

export type PatientFormValues = z.infer<typeof patientFormSchema>;
