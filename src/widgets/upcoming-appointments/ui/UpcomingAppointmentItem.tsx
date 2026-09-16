import { type AppointmentListItem } from "@/entities/appointment";
import { getFullName } from "@/entities/patient";
import { routes } from "@/shared/config/routes";
import { formatDateTime } from "@/shared/lib/date/format-date";
import Link from "next/link";

interface UpcomingAppointmentItemProps {
  appointment: AppointmentListItem;
}

export function UpcomingAppointmentItem({
  appointment,
}: UpcomingAppointmentItemProps) {
  const patientName = appointment.patient
    ? getFullName(appointment.patient)
    : `#${appointment.patientId}`;
  const doctorName = appointment.doctor?.name ?? `#${appointment.doctorId}`;

  return (
    <li className="flex flex-col gap-1 border-b py-3 first:pt-0 last:border-b-0 last:pb-0">
      <p className="font-medium">{formatDateTime(appointment.date)}</p>
      <p className="text-muted-foreground truncate text-sm">
        <Link
          href={routes.patient(appointment.patientId)}
          className="hover:text-primary text-foreground font-medium transition-colors"
        >
          {patientName}
        </Link>
        <span> · {doctorName}</span>
      </p>
    </li>
  );
}
