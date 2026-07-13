import {
  formatBirthDate,
  getFullName,
  type Patient,
} from "@/entities/patient";
import { routes } from "@/shared/config/routes";
import { TableCell, TableRow } from "@/shared/ui/table";
import Link from "next/link";
import { PatientRowActions } from "./PatientRowActions";

interface PatientTableRowProps {
  patient: Patient;
}

export function PatientTableRow({ patient }: PatientTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <Link
          href={routes.patient(patient.id)}
          className="hover:text-primary font-medium transition-colors"
        >
          {getFullName(patient)}
        </Link>
        {patient.comment && (
          <p className="text-muted-foreground mt-0.5 line-clamp-1 text-xs">
            {patient.comment}
          </p>
        )}
      </TableCell>

      <TableCell className="hidden md:table-cell">{patient.phone}</TableCell>

      <TableCell className="hidden lg:table-cell">{patient.email}</TableCell>

      <TableCell className="hidden sm:table-cell">
        {formatBirthDate(patient.birthDate)}
      </TableCell>

      <TableCell className="text-right">
        <PatientRowActions patient={patient} />
      </TableCell>
    </TableRow>
  );
}
