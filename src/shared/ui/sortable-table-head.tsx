"use client";

import { SORT_ORDER, type SortOrder } from "@/shared/types";
import { TableHead } from "@/shared/ui/table";
import { cn } from "@/shared/utils";
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from "lucide-react";

interface SortableTableHeadProps<T extends string> {
  label: string;
  field: T;
  sortField: T;
  sortDirection: SortOrder;
  onSort: (field: T) => void;
  className?: string;
}

export function SortableTableHead<T extends string>({
  label,
  field,
  sortField,
  sortDirection,
  onSort,
  className,
}: SortableTableHeadProps<T>) {
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
