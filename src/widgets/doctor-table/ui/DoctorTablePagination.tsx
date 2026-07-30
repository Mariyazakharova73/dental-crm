"use client";

import { DEFAULT_PAGE_SIZE } from "@/shared/config/constants";
import { Button } from "@/shared/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

interface DoctorTablePaginationProps {
  page: number;
  total: number;
  displayedCount: number;
  isLoading: boolean;
  onPageChange: Dispatch<SetStateAction<number>>;
}

export function DoctorTablePagination({
  page,
  total,
  displayedCount,
  isLoading,
  onPageChange,
}: DoctorTablePaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / DEFAULT_PAGE_SIZE));

  if (isLoading) return null;

  return (
    <div className="flex flex-col items-center gap-3 sm:relative sm:min-h-8 sm:justify-center">
      <p className="text-muted-foreground text-sm sm:absolute sm:top-1/2 sm:left-0 sm:-translate-y-1/2">
        Показано {displayedCount} из {total}
      </p>

      {totalPages > 1 && (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            disabled={page === 1}
            onClick={() => onPageChange((p) => Math.max(1, p - 1))}
          >
            <ChevronLeftIcon />
            Назад
          </Button>

          <span className="min-w-12 text-center text-sm">
            {page} / {totalPages}
          </span>

          <Button
            variant="ghost"
            size="sm"
            disabled={page === totalPages}
            onClick={() => onPageChange((p) => Math.min(totalPages, p + 1))}
          >
            Вперёд
            <ChevronRightIcon />
          </Button>
        </div>
      )}
    </div>
  );
}
