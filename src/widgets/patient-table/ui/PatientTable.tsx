"use client";

import { filterPatients, Patient, usePatients } from "@/entities/patient";
import { usePatientFilters } from "@/features/filter-patients";
import { useMemo } from "react";
import { PatientTablePagination } from "./PatientTablePagination";
import { PatientTableToolbar } from "./PatientTableToolbar";
import { PatientTableView } from "./PatientTableView";

const EMPTY_PATIENTS: Patient[] = [];

export function PatientTable() {
  const {
    apiParams,
    commentFilter,
    sortField,
    sortDirection,
    toggleSort,
    hasActiveFilters,
    search,
    setSearch,
    setCommentFilter,
    page,
    setPage,
  } = usePatientFilters();

  const {
    data: paginatedData,
    isLoading,
    isError,
    error,
  } = usePatients(apiParams);

  const patients = paginatedData?.data ?? EMPTY_PATIENTS;
  const total = paginatedData?.total ?? 0;

  const displayedPatients = useMemo(
    () => filterPatients(patients, "", commentFilter),
    [patients, commentFilter],
  );

  return (
    <div className="flex flex-col gap-4">
      <PatientTableToolbar
        search={search}
        onSearchChange={setSearch}
        commentFilter={commentFilter}
        onCommentFilterChange={setCommentFilter}
      />

      {isError && <p className="text-destructive text-sm">{error.message}</p>}

      <PatientTableView
        patients={displayedPatients}
        isLoading={isLoading}
        hasActiveFilters={hasActiveFilters}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={toggleSort}
      />

      <PatientTablePagination
        page={page}
        total={total}
        displayedCount={displayedPatients.length}
        isLoading={isLoading}
        onPageChange={setPage}
      />
    </div>
  );
}
