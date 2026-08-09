"use client";

import {
  type AppointmentListItem,
  useAppointments,
} from "@/entities/appointment";
import { useAppointmentFilters } from "@/features/filter-appointments";
import { TablePagination } from "@/shared/ui/table-pagination";
import { AppointmentTableToolbar } from "./AppointmentTableToolbar";
import { AppointmentTableView } from "./AppointmentTableView";

const EMPTY_APPOINTMENTS: AppointmentListItem[] = [];

export function AppointmentTable() {
  const {
    apiParams,
    sortField,
    sortDirection,
    toggleSort,
    page,
    setPage,
  } = useAppointmentFilters();

  const {
    data: paginatedData,
    isLoading,
    isError,
    error,
  } = useAppointments(apiParams);

  const appointments = paginatedData?.data ?? EMPTY_APPOINTMENTS;
  const total = paginatedData?.total ?? 0;

  return (
    <div className="flex flex-col gap-4">
      <AppointmentTableToolbar />

      {isError && (
        <p className="text-destructive text-sm">
          {error.message || "Не удалось загрузить записи"}
        </p>
      )}

      <AppointmentTableView
        appointments={appointments}
        isLoading={isLoading}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={toggleSort}
      />

      <TablePagination
        page={page}
        total={total}
        displayedCount={appointments.length}
        isLoading={isLoading}
        onPageChange={setPage}
      />
    </div>
  );
}
