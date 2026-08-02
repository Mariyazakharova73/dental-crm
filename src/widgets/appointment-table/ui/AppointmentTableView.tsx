"use client";

import type { AppointmentListItem } from "@/entities/appointment";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { APPOINTMENT_TABLE_COLUMNS } from "../lib/appointment-table-columns";
import { AppointmentTableRow } from "./AppointmentTableRow";
import { AppointmentTableSkeleton } from "./AppointmentTableSkeleton";

interface AppointmentTableViewProps {
  appointments: AppointmentListItem[];
  isLoading: boolean;
}

export function AppointmentTableView({
  appointments,
  isLoading,
}: AppointmentTableViewProps) {
  return (
    <div className="rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            {APPOINTMENT_TABLE_COLUMNS.map((col) => (
              <TableHead key={col.key} className={col.className}>
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading && <AppointmentTableSkeleton />}

          {!isLoading && appointments.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={APPOINTMENT_TABLE_COLUMNS.length}
                className="text-muted-foreground h-24 text-center"
              >
                Список записей пуст
              </TableCell>
            </TableRow>
          )}

          {!isLoading &&
            appointments.map((appointment) => (
              <AppointmentTableRow
                key={appointment.id}
                appointment={appointment}
              />
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
