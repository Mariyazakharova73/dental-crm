"use client";

import { useQuery } from "@tanstack/react-query";
import { getDoctorById } from "../api/doctor-api";
import { doctorKeys } from "./query-keys";

export function useDoctor(id: number) {
  return useQuery({
    queryKey: doctorKeys.detail(id),
    queryFn: () => getDoctorById(id),
    enabled: Number.isFinite(id) && id > 0,
  });
}
