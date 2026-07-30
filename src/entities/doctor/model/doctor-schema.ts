import { z } from "zod";

export const doctorFormSchema = z.object({
  name: z.string().trim().min(1, "Введите ФИО врача"),
  specialization: z.string().trim().min(1, "Введите специализацию"),
  experience: z
    .number({ error: "Укажите стаж" })
    .int("Стаж должен быть целым числом")
    .min(0, "Стаж не может быть отрицательным")
    .max(70, "Укажите корректный стаж"),
});

export type DoctorFormValues = z.infer<typeof doctorFormSchema>;

export const emptyDoctorFormValues: DoctorFormValues = {
  name: "",
  specialization: "",
  experience: 0,
};
