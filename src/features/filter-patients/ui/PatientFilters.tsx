"use client";

import {
  PATIENT_COMMENT_FILTER,
  type PatientCommentFilter,
} from "@/entities/patient";
import { SearchInput } from "@/shared/ui/search-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

const COMMENT_FILTER_OPTIONS = [
  { value: PATIENT_COMMENT_FILTER.ALL, label: "Все пациенты" },
  { value: PATIENT_COMMENT_FILTER.WITH_COMMENT, label: "С описанием" },
  { value: PATIENT_COMMENT_FILTER.WITHOUT_COMMENT, label: "Без описания" },
] as const;

interface PatientFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  commentFilter: PatientCommentFilter;
  onCommentFilterChange: (value: PatientCommentFilter) => void;
}

export function PatientFilters({
  search,
  onSearchChange,
  commentFilter,
  onCommentFilterChange,
}: PatientFiltersProps) {
  const selectedLabel = COMMENT_FILTER_OPTIONS.find(
    (option) => option.value === commentFilter,
  )?.label;
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <SearchInput
        value={search}
        onChange={onSearchChange}
        placeholder="Поиск по имени, телефону, email..."
      />

      <Select
        value={commentFilter}
        onValueChange={(value) =>
          onCommentFilterChange(value as PatientCommentFilter)
        }
      >
        <SelectTrigger className="w-full sm:w-48 md:w-56">
          <SelectValue placeholder="Фильтр">{selectedLabel}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {COMMENT_FILTER_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
