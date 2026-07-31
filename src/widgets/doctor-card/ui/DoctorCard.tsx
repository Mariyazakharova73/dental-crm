import type { Doctor, DoctorSchedule, Weekday } from "@/entities/doctor";
import { EntityCard } from "@/shared/ui/entity-card";
import { Separator } from "@/shared/ui/separator";
import { BriefcaseIcon, ClockIcon, StethoscopeIcon } from "lucide-react";
import type { ReactNode } from "react";

interface DoctorCardProps {
  doctor: Doctor;
  actions?: ReactNode;
}

const WEEKDAY_LABELS: Record<Weekday, string> = {
  monday: "Пн",
  tuesday: "Вт",
  wednesday: "Ср",
  thursday: "Чт",
  friday: "Пт",
  saturday: "Сб",
  sunday: "Вс",
};

const WEEKDAY_ORDER: Weekday[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

function formatExperience(years: number) {
  const mod10 = years % 10;
  const mod100 = years % 100;

  if (mod100 >= 11 && mod100 <= 14) return `${years} лет`;
  if (mod10 === 1) return `${years} год`;
  if (mod10 >= 2 && mod10 <= 4) return `${years} года`;
  return `${years} лет`;
}

function getScheduleEntries(schedule: DoctorSchedule) {
  return WEEKDAY_ORDER.flatMap((day) => {
    const interval = schedule[day];
    if (!interval) return [];
    return [{ day, interval }];
  });
}

export function DoctorCard({ doctor, actions }: DoctorCardProps) {
  const scheduleEntries = getScheduleEntries(doctor.schedule);

  return (
    <EntityCard
      title={doctor.name}
      description="Карточка врача"
      actions={actions}
    >
      <dl className="grid gap-4 sm:grid-cols-2">
        <div className="flex gap-3">
          <StethoscopeIcon className="text-muted-foreground mt-0.5 size-4 shrink-0" />
          <div className="min-w-0">
            <dt className="text-muted-foreground text-xs">Специализация</dt>
            <dd className="truncate font-medium">{doctor.specialization}</dd>
          </div>
        </div>

        <div className="flex gap-3">
          <BriefcaseIcon className="text-muted-foreground mt-0.5 size-4 shrink-0" />
          <div className="min-w-0">
            <dt className="text-muted-foreground text-xs">Стаж</dt>
            <dd className="font-medium">
              {formatExperience(doctor.experience)}
            </dd>
          </div>
        </div>
      </dl>

      <Separator className="my-4" />

      <div>
        <div className="mb-2 flex items-center gap-2">
          <ClockIcon className="text-muted-foreground size-4" />
          <p className="text-muted-foreground text-xs">Расписание</p>
        </div>

        {scheduleEntries.length === 0 ? (
          <p className="text-sm leading-relaxed">Расписание не задано</p>
        ) : (
          <ul className="grid gap-2 sm:grid-cols-2">
            {scheduleEntries.map(({ day, interval }) => (
              <li
                key={day}
                className="bg-muted/40 flex items-center justify-between rounded-lg px-3 py-2 text-sm"
              >
                <span className="font-medium">{WEEKDAY_LABELS[day]}</span>
                <span className="text-muted-foreground">
                  {interval[0]} – {interval[1]}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </EntityCard>
  );
}
