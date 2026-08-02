"use client";

import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "../api/appointment-api";
import { appointmentKeys } from "./query-keys";

export function useAppointments() {
  return useQuery({
    queryKey: appointmentKeys.lists(),
    queryFn: () => getAppointments(),
  });
}
