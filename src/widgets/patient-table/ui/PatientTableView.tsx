"use client";

import type { Patient, PatientSortField } from "@/entities/patient";

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
import { PATIENT_TABLE_COLUMNS } from "../lib/patient-table-columns";
import { PatientTableRow } from "./PatientTableRow";
import { PatientTableSkeleton } from "./PatientTableSkeleton";

interface PatientTableViewProps {
  patients: Patient[];
  isLoading: boolean;
  hasActiveFilters: boolean;
  sortField: PatientSortField;
  sortDirection: SortOrder;
  onSort: (field: PatientSortField) => void;
}

export function PatientTableView({
  patients,
  isLoading,
  hasActiveFilters,
  sortField,
  sortDirection,
  onSort,
}: PatientTableViewProps) {
  return (
    <div className="rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            {PATIENT_TABLE_COLUMNS.map((col) =>
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
          {isLoading && <PatientTableSkeleton />}

          {!isLoading && patients.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={PATIENT_TABLE_COLUMNS.length}
                className="text-muted-foreground h-24 text-center"
              >
                {hasActiveFilters
                  ? "Ничего не найдено"
                  : "Список пациентов пуст"}
              </TableCell>
            </TableRow>
          )}

          {!isLoading &&
            patients.map((patient) => (
              <PatientTableRow key={patient.id} patient={patient} />
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
