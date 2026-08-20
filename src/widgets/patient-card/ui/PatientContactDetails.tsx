import { formatBirthDate, type Patient } from "@/entities/patient";
import { Separator } from "@/shared/ui/separator";
import { CalendarIcon, MailIcon, PhoneIcon } from "lucide-react";

interface PatientContactDetailsProps {
  patient: Patient;
}

export function PatientContactDetails({ patient }: PatientContactDetailsProps) {
  return (
    <>
      <dl className="grid gap-4 sm:grid-cols-2">
        <div className="flex gap-3">
          <PhoneIcon className="text-muted-foreground mt-0.5 size-4 shrink-0" />
          <div className="min-w-0">
            <dt className="text-muted-foreground text-xs">Телефон</dt>
            <dd className="truncate font-medium">{patient.phone}</dd>
          </div>
        </div>

        <div className="flex gap-3">
          <MailIcon className="text-muted-foreground mt-0.5 size-4 shrink-0" />
          <div className="min-w-0">
            <dt className="text-muted-foreground text-xs">Email</dt>
            <dd className="truncate font-medium">{patient.email}</dd>
          </div>
        </div>

        <div className="flex gap-3">
          <CalendarIcon className="text-muted-foreground mt-0.5 size-4 shrink-0" />
          <div className="min-w-0">
            <dt className="text-muted-foreground text-xs">Дата рождения</dt>
            <dd className="font-medium">
              {formatBirthDate(patient.birthDate)}
            </dd>
          </div>
        </div>
      </dl>

      <Separator className="my-4" />

      <div>
        <p className="text-muted-foreground mb-1 text-xs">Комментарий</p>
        <p className="text-sm leading-relaxed">
          {patient.comment.trim() || "Нет комментария"}
        </p>
      </div>
    </>
  );
}
