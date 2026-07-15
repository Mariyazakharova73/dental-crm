"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPatient } from "../api/patient-api";
import type { CreatePatientPayload } from "../types";
import { patientKeys } from "./query-keys";

export function useCreatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePatientPayload) => createPatient(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: patientKeys.all });
    },
  });
}
