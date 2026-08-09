"use client";

import { Checkbox } from "@/shared/ui/checkbox";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import {
  DEFAULT_SCHEDULE_SLOT_MINUTES,
  addMinutesToTime,
} from "../lib/doctor-schedule";
import { WEEKDAY_LABELS, WEEKDAY_ORDER } from "../lib/weekdays";
import type { DoctorFormValues } from "../model/doctor-schema";
import type { Weekday } from "../types";

function DayScheduleRow({ day }: { day: Weekday }) {
  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useFormContext<DoctorFormValues>();

  const enabled = useWatch({ control, name: `schedule.${day}.enabled` });
  const end = useWatch({ control, name: `schedule.${day}.end` });
  const dayErrors = errors.schedule?.[day];
  const timeError = dayErrors?.start?.message || dayErrors?.end?.message;

  const startRegister = register(`schedule.${day}.start`, {
    onChange: (event) => {
      const nextStart = event.target.value;
      setValue(
        `schedule.${day}.end`,
        addMinutesToTime(nextStart, DEFAULT_SCHEDULE_SLOT_MINUTES),
        { shouldDirty: true, shouldValidate: true },
      );
    },
  });

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-3">
        <Controller
          name={`schedule.${day}.enabled`}
          control={control}
          render={({ field }) => (
            <Label className="flex w-12 shrink-0 cursor-pointer items-center gap-2">
              <Checkbox
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
              />
              <span>{WEEKDAY_LABELS[day]}</span>
            </Label>
          )}
        />

        <Input
          type="time"
          className="flex-1"
          disabled={!enabled}
          aria-label={`${WEEKDAY_LABELS[day]} с`}
          aria-invalid={!!dayErrors?.start}
          {...startRegister}
        />

        <span className="text-muted-foreground w-20 shrink-0 text-sm tabular-nums">
          до {end || "—"}
        </span>
      </div>
      {timeError && <p className="text-destructive text-xs">{timeError}</p>}
    </div>
  );
}

export function DoctorScheduleFields() {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium">Расписание</p>
      <p className="text-muted-foreground text-xs">
        Выберите начало — конец ставится автоматически (+
        {DEFAULT_SCHEDULE_SLOT_MINUTES} мин)
      </p>
      <div className="flex flex-col gap-2">
        {WEEKDAY_ORDER.map((day) => (
          <DayScheduleRow key={day} day={day} />
        ))}
      </div>
    </div>
  );
}
