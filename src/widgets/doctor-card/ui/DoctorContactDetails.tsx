import { type Doctor } from "@/entities/doctor";
import { BriefcaseIcon, StethoscopeIcon } from "lucide-react";

interface DoctorContactDetailsProps {
  doctor: Doctor;
}

function formatExperience(years: number) {
  const mod10 = years % 10;
  const mod100 = years % 100;

  if (mod100 >= 11 && mod100 <= 14) return `${years} лет`;
  if (mod10 === 1) return `${years} год`;
  if (mod10 >= 2 && mod10 <= 4) return `${years} года`;
  return `${years} лет`;
}

export function DoctorContactDetails({ doctor }: DoctorContactDetailsProps) {
  return (
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
          <dd className="font-medium">{formatExperience(doctor.experience)}</dd>
        </div>
      </div>
    </dl>
  );
}
