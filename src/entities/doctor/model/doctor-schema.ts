import { z } from "zod";
import {
  TIME_HH_MM_REGEX,
  createEmptyScheduleFormValue,
  type DayScheduleFormValue,
} from "../lib/doctor-schedule";
import { WEEKDAY_ORDER } from "../lib/weekdays";

const dayScheduleFormSchema = z
  .object({
    enabled: z.boolean(),
    start: z.string(),
    end: z.string(),
  })
  .superRefine((day, ctx) => {
    if (!day.enabled) return;

    if (!TIME_HH_MM_REGEX.test(day.start)) {
      ctx.addIssue({
        code: "custom",
        message: "Формат ЧЧ:ММ",
        path: ["start"],
      });
    }

    if (!TIME_HH_MM_REGEX.test(day.end)) {
      ctx.addIssue({
        code: "custom",
        message: "Формат ЧЧ:ММ",
        path: ["end"],
      });
    }

    if (
      TIME_HH_MM_REGEX.test(day.start) &&
      TIME_HH_MM_REGEX.test(day.end) &&
      day.start >= day.end
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Конец позже начала",
        path: ["end"],
      });
    }
  });

const scheduleFormSchema = z.object(
  Object.fromEntries(
    WEEKDAY_ORDER.map((day) => [day, dayScheduleFormSchema]),
  ) as Record<
    (typeof WEEKDAY_ORDER)[number],
    typeof dayScheduleFormSchema
  >,
);

export const doctorFormSchema = z.object({
  name: z.string().trim().min(1, "Введите ФИО врача"),
  specialization: z.string().trim().min(1, "Введите специализацию"),
  experience: z
    .number({ error: "Укажите стаж" })
    .int("Стаж должен быть целым числом")
    .min(0, "Стаж не может быть отрицательным")
    .max(70, "Укажите корректный стаж"),
  schedule: scheduleFormSchema,
});

export type DoctorFormValues = z.infer<typeof doctorFormSchema>;

export type { DayScheduleFormValue };

export const emptyDoctorFormValues: DoctorFormValues = {
  name: "",
  specialization: "",
  experience: 0,
  schedule: createEmptyScheduleFormValue(),
};
