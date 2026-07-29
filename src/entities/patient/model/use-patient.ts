"use client";

import { useQuery } from "@tanstack/react-query";
import { getPatientById } from "../api/patient-api";
import { patientKeys } from "./query-keys";

export function usePatient(id: number) {
  return useQuery({
    queryKey: patientKeys.detail(id),
    queryFn: () => getPatientById(id),
    enabled: Number.isFinite(id) && id > 0,
  });
}
