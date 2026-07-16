"use client";

import type { PatientCommentFilter } from "@/entities/patient";
import { CreatePatientDialog } from "@/features/create-patient";
import { PatientFilters } from "@/features/filter-patients";

interface PatientTableToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  commentFilter: PatientCommentFilter;
  onCommentFilterChange: (value: PatientCommentFilter) => void;
}

export function PatientTableToolbar({
  search,
  onSearchChange,
  commentFilter,
  onCommentFilterChange,
}: PatientTableToolbarProps) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <PatientFilters
        search={search}
        onSearchChange={onSearchChange}
        commentFilter={commentFilter}
        onCommentFilterChange={onCommentFilterChange}
      />
      <CreatePatientDialog />
    </div>
  );
}
