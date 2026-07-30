"use client";

import { type Doctor, useDoctors } from "@/entities/doctor";
import { useDoctorFilters } from "@/features/filter-doctors";
import { DoctorTablePagination } from "./DoctorTablePagination";
import { DoctorTableToolbar } from "./DoctorTableToolbar";
import { DoctorTableView } from "./DoctorTableView";

const EMPTY_DOCTORS: Doctor[] = [];

export function DoctorTable() {
  const {
    apiParams,
    sortField,
    sortDirection,
    toggleSort,
    hasActiveFilters,
    search,
    setSearch,
    page,
    setPage,
  } = useDoctorFilters();

  const {
    data: paginatedData,
    isLoading,
    isError,
    error,
  } = useDoctors(apiParams);

  const doctors = paginatedData?.data ?? EMPTY_DOCTORS;
  const total = paginatedData?.total ?? 0;

  return (
    <div className="flex flex-col gap-4">
      <DoctorTableToolbar search={search} onSearchChange={setSearch} />

      {isError && <p className="text-destructive text-sm">{error.message}</p>}

      <DoctorTableView
        doctors={doctors}
        isLoading={isLoading}
        hasActiveFilters={hasActiveFilters}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={toggleSort}
      />

      <DoctorTablePagination
        page={page}
        total={total}
        displayedCount={doctors.length}
        isLoading={isLoading}
        onPageChange={setPage}
      />
    </div>
  );
}
