"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAppointment } from "../api/appointment-api";
import type { UpdateAppointmentPayload } from "../types";
import { appointmentKeys } from "./query-keys";

export function useUpdateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateAppointmentPayload;
    }) => updateAppointment(id, payload),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: appointmentKeys.all });
      queryClient.invalidateQueries({ queryKey: appointmentKeys.detail(id) });
    },
  });
}
