"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAppointment } from "../api/appointment-api";
import { appointmentKeys } from "./query-keys";

export function useDeleteAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteAppointment(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: appointmentKeys.all });
      queryClient.removeQueries({ queryKey: appointmentKeys.detail(id) });
    },
  });
}
