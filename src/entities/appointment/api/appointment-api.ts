import { api } from "@/shared/api";
import { API_ENDPOINTS } from "@/shared/config/api-endpoints";
import type {
  Appointment,
  AppointmentListItem,
  CreateAppointmentPayload,
  UpdateAppointmentPayload,
} from "../types";

export async function getAppointments(): Promise<AppointmentListItem[]> {
  const { data } = await api.get<AppointmentListItem[]>(
    `${API_ENDPOINTS.appointments}?_expand=patient&_expand=doctor`,
  );
  return data;
}

export async function createAppointment(payload: CreateAppointmentPayload) {
  const { data } = await api.post<Appointment>(
    API_ENDPOINTS.appointments,
    payload,
  );
  return data;
}

export async function updateAppointment(
  id: number,
  payload: UpdateAppointmentPayload,
): Promise<Appointment> {
  const { data } = await api.put<Appointment>(
    API_ENDPOINTS.appointment(id),
    payload,
  );
  return data;
}