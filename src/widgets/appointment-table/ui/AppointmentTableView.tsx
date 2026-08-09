"use client";

import type {
  AppointmentListItem,
  AppointmentSortField,
} from "@/entities/appointment";
import type { SortOrder } from "@/shared/types";
import { SortableTableHead } from "@/shared/ui/sortable-table-head";
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
  sortField: AppointmentSortField;
  sortDirection: SortOrder;
  onSort: (field: AppointmentSortField) => void;
}

export function AppointmentTableView({
  appointments,
  isLoading,
  sortField,
  sortDirection,
  onSort,
}: AppointmentTableViewProps) {
  return (
    <div className="rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            {APPOINTMENT_TABLE_COLUMNS.map((col) =>
              col.sortable ? (
                <SortableTableHead
                  key={col.key}
                  label={col.label}
                  field={col.sortField}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={onSort}
                  className={col.className}
                />
              ) : (
                <TableHead key={col.key} className={col.className}>
                  {col.label}
                </TableHead>
              ),
            )}
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
