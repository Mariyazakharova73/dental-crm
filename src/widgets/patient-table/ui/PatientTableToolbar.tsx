"use client";

import type { PatientCommentFilter } from "@/entities/patient";
import { PatientFilters } from "@/features/filter-patients";
import { routes } from "@/shared/config/routes";
import { Button } from "@/shared/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

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

      <Button
        nativeButton={false}
        render={<Link href={routes.patientsCreate} />}
      >
        <PlusIcon />
        Добавить пациента
      </Button>
    </div>
  );
}
