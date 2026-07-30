"use client";

import { useQuery } from "@tanstack/react-query";
import { getDoctors } from "../api/doctor-api";
import { doctorKeys, DoctorListParams } from "./query-keys";

export function useDoctors(params?: DoctorListParams) {
  return useQuery({
    queryKey: doctorKeys.lists(params),
    queryFn: () => getDoctors(params),
  });
}
