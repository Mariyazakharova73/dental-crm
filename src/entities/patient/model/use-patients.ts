"use client";

import { useQuery } from "@tanstack/react-query";
import { getPatients } from "../api/patient-api";
import { patientKeys, PatientListParams } from "./query-keys";

export function usePatients(params?: PatientListParams) {
  return useQuery({
    queryKey: patientKeys.lists(params),
    queryFn: () => getPatients(params),
  });
}
