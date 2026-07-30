import type { Doctor } from "@/entities/doctor";
import { routes } from "@/shared/config/routes";
import { TableCell, TableRow } from "@/shared/ui/table";
import Link from "next/link";
import { DoctorRowActions } from "./DoctorRowActions";

interface DoctorTableRowProps {
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

export function DoctorTableRow({ doctor }: DoctorTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <Link
          href={routes.doctor(doctor.id)}
          className="hover:text-primary font-medium transition-colors"
        >
          {doctor.name}
        </Link>
      </TableCell>

      <TableCell className="hidden sm:table-cell">
        {doctor.specialization}
      </TableCell>

      <TableCell className="hidden md:table-cell">
        {formatExperience(doctor.experience)}
      </TableCell>

      <TableCell className="text-right">
        <DoctorRowActions doctor={doctor} />
      </TableCell>
    </TableRow>
  );
}
