import { formatBirthDate, getFullName, type Patient } from "@/entities/patient";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";
import { CalendarIcon, MailIcon, PhoneIcon } from "lucide-react";
import type { ReactNode } from "react";

interface PatientCardProps {
  patient: Patient;
  actions?: ReactNode;
}

export function PatientCard({ patient, actions }: PatientCardProps) {
  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl">{getFullName(patient)}</CardTitle>
            <CardDescription>Карточка пациента</CardDescription>
          </div>
          {actions ? (
            <div className="flex flex-wrap gap-2">{actions}</div>
          ) : null}
        </div>
      </CardHeader>

      <CardContent className="pt-4">
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
      </CardContent>
    </Card>
  );
}
