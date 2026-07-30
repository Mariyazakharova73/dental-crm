"use client";

import {
  DOCTOR_SORT_FIELD,
  type DoctorListParams,
  type DoctorSortField,
} from "@/entities/doctor";
import { DEFAULT_PAGE_SIZE } from "@/shared/config/constants";
import { SORT_ORDER, type SortOrder } from "@/shared/types";
import { useCallback, useDeferredValue, useMemo, useState } from "react";

const SORT_FIELD_MAP: Record<DoctorSortField, string> = {
  [DOCTOR_SORT_FIELD.NAME]: "name",
  [DOCTOR_SORT_FIELD.SPECIALIZATION]: "specialization",
  [DOCTOR_SORT_FIELD.EXPERIENCE]: "experience",
};

export function useDoctorFilters() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<DoctorSortField>(
    DOCTOR_SORT_FIELD.NAME,
  );
  const [sortDirection, setSortDirection] = useState<SortOrder>(SORT_ORDER.ASC);

  const deferredSearch = useDeferredValue(search);

  const toggleSort = useCallback(
    (field: DoctorSortField) => {
      setPage(1);
      if (sortField === field) {
        setSortDirection((d) =>
          d === SORT_ORDER.ASC ? SORT_ORDER.DESC : SORT_ORDER.ASC,
        );
      } else {
        setSortField(field);
        setSortDirection(SORT_ORDER.ASC);
      }
    },
    [sortField],
  );

  const apiParams = useMemo<DoctorListParams>(
    () => ({
      q: deferredSearch.trim() || undefined,
      sort: SORT_FIELD_MAP[sortField],
      order: sortDirection,
      page,
      limit: DEFAULT_PAGE_SIZE,
    }),
    [deferredSearch, sortField, sortDirection, page],
  );

  const hasActiveFilters = search.trim().length > 0;

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  return {
    search,
    setSearch: handleSearchChange,
    sortField,
    sortDirection,
    toggleSort,
    apiParams,
    hasActiveFilters,
    page,
    setPage,
  };
}
