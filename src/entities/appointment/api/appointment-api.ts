import { api } from "@/shared/api";
import { API_ENDPOINTS } from "@/shared/config/api-endpoints";
import { SortOrder } from "@/shared/types";
import { PaginatedResponse } from "@/shared/types/common";
import type {
  Appointment,
  AppointmentListItem,
  CreateAppointmentPayload,
  UpdateAppointmentPayload,
} from "../types";

interface GetAppointmentsParams {
  patientId?: number;
  sort?: string;
  order?: SortOrder;
  page?: number;
  limit?: number;
}

export async function getAppointments(
  params?: GetAppointmentsParams,
): Promise<PaginatedResponse<AppointmentListItem>> {
  const response = await api.get<AppointmentListItem[]>(
    `${API_ENDPOINTS.appointments}?_expand=patient&_expand=doctor`,
    {
      params: {
        patientId: params?.patientId,
        _sort: params?.sort,
        _order: params?.order,
        _page: params?.page,
        _limit: params?.limit,
      },
    },
  );

  const total = Number(
    response.headers["x-total-count"] ?? response.data.length,
  );

  return { data: response.data, total };
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

export async function deleteAppointment(id: number): Promise<void> {
  await api.delete(API_ENDPOINTS.appointment(id));
}
