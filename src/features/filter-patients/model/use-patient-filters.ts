"use client";

import {
  PATIENT_COMMENT_FILTER,
  PATIENT_SORT_FIELD,
  type PatientCommentFilter,
  type PatientSortField,
} from "@/entities/patient";
import type { PatientListParams } from "@/entities/patient/model/query-keys";
import { DEFAULT_PAGE_SIZE } from "@/shared/config/constants";
import { SORT_ORDER, SortOrder } from "@/shared/types";
import { useCallback, useDeferredValue, useMemo, useState } from "react";

const SORT_FIELD_MAP: Record<PatientSortField, string> = {
  [PATIENT_SORT_FIELD.NAME]: "lastName",
  [PATIENT_SORT_FIELD.BIRTH_DATE]: "birthDate",
  [PATIENT_SORT_FIELD.EMAIL]: "email",
};

export function usePatientFilters() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [commentFilter, setCommentFilter] = useState<PatientCommentFilter>(
    PATIENT_COMMENT_FILTER.ALL,
  );
  const [sortField, setSortField] = useState<PatientSortField>(
    PATIENT_SORT_FIELD.NAME,
  );
  const [sortDirection, setSortDirection] = useState<SortOrder>(SORT_ORDER.ASC);

  const deferredSearch = useDeferredValue(search);

  const toggleSort = useCallback(
    (field: PatientSortField) => {
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

  const apiParams = useMemo<PatientListParams>(
    () => ({
      q: deferredSearch.trim() || undefined,
      sort: SORT_FIELD_MAP[sortField],
      order: sortDirection,
      page,
      limit: DEFAULT_PAGE_SIZE,
    }),
    [deferredSearch, sortField, sortDirection, page],
  );

  const hasActiveFilters =
    search.trim().length > 0 || commentFilter !== PATIENT_COMMENT_FILTER.ALL;

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value); // обновить поиск
    setPage(1); // вернуться на 1-ю страницу
  }, []);

  return {
    search,
    setSearch: handleSearchChange,
    commentFilter,
    setCommentFilter,
    sortField,
    sortDirection,
    toggleSort,
    apiParams,
    hasActiveFilters,
    page,
    setPage,
  };
}
