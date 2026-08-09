"use client";

import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "../api/appointment-api";
import { appointmentKeys, type AppointmentListParams } from "./query-keys";

export function useAppointments(params?: AppointmentListParams) {
  return useQuery({
    queryKey: appointmentKeys.lists(params),
    queryFn: () => getAppointments(params),
  });
}
