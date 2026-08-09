"use client";

import {
  APPOINTMENT_SORT_FIELD,
  type AppointmentListParams,
  type AppointmentSortField,
} from "@/entities/appointment";
import { DEFAULT_PAGE_SIZE } from "@/shared/config/constants";
import { SORT_ORDER, type SortOrder } from "@/shared/types";
import { useCallback, useMemo, useState } from "react";

const SORT_FIELD_MAP: Record<AppointmentSortField, string> = {
  [APPOINTMENT_SORT_FIELD.DATE]: "date",
  [APPOINTMENT_SORT_FIELD.DOCTOR]: "doctorId",
  [APPOINTMENT_SORT_FIELD.PATIENT]: "patientId",
  [APPOINTMENT_SORT_FIELD.STATUS]: "status",
};

export function useAppointmentFilters() {
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<AppointmentSortField>(
    APPOINTMENT_SORT_FIELD.DATE,
  );
  const [sortDirection, setSortDirection] = useState<SortOrder>(SORT_ORDER.DESC);

  const toggleSort = useCallback(
    (field: AppointmentSortField) => {
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

  const apiParams = useMemo<AppointmentListParams>(
    () => ({
      sort: SORT_FIELD_MAP[sortField],
      order: sortDirection,
      page,
      limit: DEFAULT_PAGE_SIZE,
    }),
    [sortField, sortDirection, page],
  );

  return {
    sortField,
    sortDirection,
    toggleSort,
    apiParams,
    page,
    setPage,
  };
}
