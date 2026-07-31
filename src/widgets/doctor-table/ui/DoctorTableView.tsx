"use client";

import type { Doctor, DoctorSortField } from "@/entities/doctor";

import type { SortOrder } from "@/shared/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { DOCTOR_TABLE_COLUMNS } from "../lib/doctor-table-columns";
import { DoctorTableRow } from "./DoctorTableRow";
import { DoctorTableSkeleton } from "./DoctorTableSkeleton";
import { SortableTableHead } from '@/shared/ui/sortable-table-head';

interface DoctorTableViewProps {
  doctors: Doctor[];
  isLoading: boolean;
  hasActiveFilters: boolean;
  sortField: DoctorSortField;
  sortDirection: SortOrder;
  onSort: (field: DoctorSortField) => void;
}

export function DoctorTableView({
  doctors,
  isLoading,
  hasActiveFilters,
  sortField,
  sortDirection,
  onSort,
}: DoctorTableViewProps) {
  return (
    <div className="rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            {DOCTOR_TABLE_COLUMNS.map((col) =>
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
          {isLoading && <DoctorTableSkeleton />}

          {!isLoading && doctors.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={DOCTOR_TABLE_COLUMNS.length}
                className="text-muted-foreground h-24 text-center"
              >
                {hasActiveFilters
                  ? "Ничего не найдено"
                  : "Список врачей пуст"}
              </TableCell>
            </TableRow>
          )}

          {!isLoading &&
            doctors.map((doctor) => (
              <DoctorTableRow key={doctor.id} doctor={doctor} />
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
