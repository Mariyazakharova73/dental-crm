"use client";

import { CreateDoctorDialog } from "@/features/create-doctor";
import { DoctorFilters } from "@/features/filter-doctors";

interface DoctorTableToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export function DoctorTableToolbar({
  search,
  onSearchChange,
}: DoctorTableToolbarProps) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <DoctorFilters search={search} onSearchChange={onSearchChange} />
      <CreateDoctorDialog />
    </div>
  );
}
