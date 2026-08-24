import { type AppointmentListItem } from "@/entities/appointment";
import { getFullName } from "@/entities/patient";
import { ChangeAppointmentStatus } from "@/features/change-appointment-status";
import { formatDateTime } from "@/shared/lib/date/format-date";
import { TableCell, TableRow } from "@/shared/ui/table";
import { AppointmentRowActions } from "./AppointmentRowActions";

interface AppointmentTableRowProps {
  appointment: AppointmentListItem;
}

export function AppointmentTableRow({ appointment }: AppointmentTableRowProps) {
  const patientLabel = appointment.patient
    ? getFullName(appointment.patient)
    : `#${appointment.patientId}`;

  const doctorLabel = appointment.doctor?.name ?? `#${appointment.doctorId}`;

  return (
    <TableRow>
      <TableCell className="font-medium">
        {formatDateTime(appointment.date)}
      </TableCell>
      <TableCell className="hidden sm:table-cell">{patientLabel}</TableCell>
      <TableCell className="hidden md:table-cell">{doctorLabel}</TableCell>
      <TableCell>
        <ChangeAppointmentStatus appointment={appointment} />
      </TableCell>
      <TableCell className="text-right">
        <AppointmentRowActions appointment={appointment} />
      </TableCell>
    </TableRow>
  );
}
