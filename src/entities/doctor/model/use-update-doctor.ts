"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDoctor } from "../api/doctor-api";
import type { UpdateDoctorPayload } from "../types";
import { doctorKeys } from "./query-keys";

export function useUpdateDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateDoctorPayload;
    }) => updateDoctor(id, payload),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: doctorKeys.all });
      queryClient.invalidateQueries({ queryKey: doctorKeys.detail(id) });
    },
  });
}
