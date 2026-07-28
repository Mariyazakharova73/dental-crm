"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePatient } from "../api/patient-api";
import { patientKeys } from "./query-keys";

export function useDeletePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deletePatient(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: patientKeys.all });
      queryClient.removeQueries({ queryKey: patientKeys.detail(id) });
    },
  });
}
