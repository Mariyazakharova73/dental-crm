"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePatient } from "../api/patient-api";
import { patientKeys } from "./query-keys";
import type { UpdatePatientPayload } from "../types";

export function useUpdatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdatePatientPayload }) =>
      updatePatient(id, payload),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: patientKeys.all });
      queryClient.invalidateQueries({ queryKey: patientKeys.detail(id) });
    },
  });
}