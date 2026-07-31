"use client";

import { SearchInput } from "@/shared/ui/search-input";

interface DoctorFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export function DoctorFilters({ search, onSearchChange }: DoctorFiltersProps) {
  return (
    <SearchInput
      value={search}
      onChange={onSearchChange}
      placeholder="Поиск по имени, специализации..."
    />
  );
}
