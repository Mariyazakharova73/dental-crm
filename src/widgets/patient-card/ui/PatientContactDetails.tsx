"use client";

import { type Patient } from "@/entities/patient";
import { formatDate } from "@/shared/lib/date/format-date";
import { Separator } from "@/shared/ui/separator";
import { CalendarIcon, MailIcon, PhoneIcon } from "lucide-react";
import { CopyButton } from "@/shared/ui/copy-button";

interface PatientContactDetailsProps {
  patient: Patient;
}

export function PatientContactDetails({ patient }: PatientContactDetailsProps) {
  return (
    <>
      <dl className="grid gap-4 sm:grid-cols-2">
        <div className="flex min-w-0 gap-3">
          <PhoneIcon className="text-muted-foreground mt-0.5 size-4 shrink-0" />
          <div className="min-w-0">
            <dt className="text-muted-foreground text-xs">Телефон</dt>
            <dd className="flex items-center gap-1 font-medium">
              {patient.phone}
              <CopyButton value={patient.phone} label="Скопировать телефон" />
            </dd>
          </div>
        </div>

        <div className="flex min-w-0 gap-3">
          <MailIcon className="text-muted-foreground mt-0.5 size-4 shrink-0" />
          <div className="min-w-0">
            <dt className="text-muted-foreground text-xs">Email</dt>
            <dd className="flex items-center gap-1 font-medium">
              {patient.email}
              <CopyButton value={patient.email} label="Скопировать email" />
            </dd>
          </div>
        </div>

        <div className="flex gap-3">
          <CalendarIcon className="text-muted-foreground mt-0.5 size-4 shrink-0" />
          <div className="min-w-0">
            <dt className="text-muted-foreground text-xs">Дата рождения</dt>
            <dd className="font-medium">{formatDate(patient.birthDate)}</dd>
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
