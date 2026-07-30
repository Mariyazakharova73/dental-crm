"use client";

import { Input } from "@/shared/ui/input";
import { SearchIcon } from "lucide-react";

interface DoctorFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export function DoctorFilters({ search, onSearchChange }: DoctorFiltersProps) {
  return (
    <div className="relative w-full sm:max-w-sm">
      <SearchIcon className="text-muted-foreground absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
      <Input
        placeholder="Поиск по имени, специализации..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-8"
      />
    </div>
  );
}
