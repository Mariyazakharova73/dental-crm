import {
  APPOINTMENT_STATUS,
  APPOINTMENT_STATUS_LABEL,
  formatAppointmentDate,
  type AppointmentListItem,
  type AppointmentStatus,
} from "@/entities/appointment";
import { getFullName } from "@/entities/patient";
import { Badge } from "@/shared/ui/badge";
import { TableCell, TableRow } from "@/shared/ui/table";

interface AppointmentTableRowProps {
  appointment: AppointmentListItem;
}

function statusVariant(
  status: AppointmentStatus,
): "default" | "secondary" | "outline" | "destructive" {
  switch (status) {
    case APPOINTMENT_STATUS.CONFIRMED:
      return "default";
    case APPOINTMENT_STATUS.COMPLETED:
      return "secondary";
    case APPOINTMENT_STATUS.CANCELLED:
      return "destructive";
    default:
      return "outline";
  }
}

export function AppointmentTableRow({ appointment }: AppointmentTableRowProps) {
  const patientLabel = appointment.patient
    ? getFullName(appointment.patient)
    : `#${appointment.patientId}`;

  const doctorLabel = appointment.doctor?.name ?? `#${appointment.doctorId}`;

  return (
    <TableRow>
      <TableCell className="font-medium">
        {formatAppointmentDate(appointment.date)}
      </TableCell>
      <TableCell className="hidden sm:table-cell">{patientLabel}</TableCell>
      <TableCell className="hidden md:table-cell">{doctorLabel}</TableCell>
      <TableCell>
        <Badge variant={statusVariant(appointment.status)}>
          {APPOINTMENT_STATUS_LABEL[appointment.status]}
        </Badge>
      </TableCell>
    </TableRow>
  );
}
