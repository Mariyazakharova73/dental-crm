"use client";

import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
} from "lucide-react";

import type { PatientSortField } from "@/entities/patient";
import { cn } from "@/shared/utils";
import { TableHead } from "@/shared/ui/table";
import { SORT_ORDER, SortOrder } from '@/shared/types';

interface SortableTableHeadProps {
  label: string;
  field: PatientSortField;
  sortField: PatientSortField;
  sortDirection: SortOrder;
  onSort: (field: PatientSortField) => void;
  className?: string;
}

export function SortableTableHead({
  label,
  field,
  sortField,
  sortDirection,
  onSort,
  className,
}: SortableTableHeadProps) {
  const isActive = sortField === field;

  return (
    <TableHead className={className}>
      <button
        type="button"
        onClick={() => onSort(field)}
        className={cn(
          "hover:text-foreground -ml-2 inline-flex items-center gap-1 rounded-md px-2 py-1 transition-colors",
          isActive ? "text-foreground font-semibold" : "text-muted-foreground",
        )}
      >
        {label}
        {isActive ? (
          sortDirection === SORT_ORDER.ASC ? (
            <ArrowUpIcon className="size-3.5" />
          ) : (
            <ArrowDownIcon className="size-3.5" />
          )
        ) : (
          <ArrowUpDownIcon className="size-3.5 opacity-50" />
        )}
      </button>
    </TableHead>
  );
}
