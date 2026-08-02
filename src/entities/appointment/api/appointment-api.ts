import { api } from "@/shared/api";
import { API_ENDPOINTS } from "@/shared/config/api-endpoints";
import type { AppointmentListItem } from "../types";

export async function getAppointments(): Promise<AppointmentListItem[]> {
  const { data } = await api.get<AppointmentListItem[]>(
    `${API_ENDPOINTS.appointments}?_expand=patient&_expand=doctor`,
  );
  return data;
}
