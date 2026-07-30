"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDoctor } from "../api/doctor-api";
import { doctorKeys } from "./query-keys";

export function useDeleteDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteDoctor(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: doctorKeys.all });
      queryClient.removeQueries({ queryKey: doctorKeys.detail(id) });
    },
  });
}
