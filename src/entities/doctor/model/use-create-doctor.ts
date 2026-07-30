"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDoctor } from "../api/doctor-api";
import type { CreateDoctorPayload } from "../types";
import { doctorKeys } from "./query-keys";

export function useCreateDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateDoctorPayload) => createDoctor(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: doctorKeys.all });
    },
  });
}
