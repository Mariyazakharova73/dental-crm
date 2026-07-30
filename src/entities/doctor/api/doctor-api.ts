import { api } from "@/shared/api";
import { API_ENDPOINTS } from "@/shared/config/api-endpoints";
import { SortOrder } from "@/shared/types";
import { PaginatedResponse } from "@/shared/types/common";
import type {
  CreateDoctorPayload,
  Doctor,
  UpdateDoctorPayload,
} from "../types";

interface GetDoctorsParams {
  q?: string;
  sort?: string;
  order?: SortOrder;
  page?: number;
  limit?: number;
}

export async function getDoctors(
  params?: GetDoctorsParams,
): Promise<PaginatedResponse<Doctor>> {
  const response = await api.get<Doctor[]>(API_ENDPOINTS.doctors, {
    params: {
      q: params?.q,
      _sort: params?.sort,
      _order: params?.order,
      _page: params?.page,
      _limit: params?.limit,
    },
  });

  const total = Number(
    response.headers["x-total-count"] ?? response.data.length,
  );

  return { data: response.data, total };
}

export async function getDoctorById(id: number): Promise<Doctor> {
  const { data } = await api.get<Doctor>(API_ENDPOINTS.doctor(id));
  return data;
}

export async function createDoctor(
  payload: CreateDoctorPayload,
): Promise<Doctor> {
  const { data } = await api.post<Doctor>(API_ENDPOINTS.doctors, payload);
  return data;
}

export async function updateDoctor(
  id: number,
  payload: UpdateDoctorPayload,
): Promise<Doctor> {
  const { data } = await api.put<Doctor>(API_ENDPOINTS.doctor(id), payload);
  return data;
}

export async function deleteDoctor(id: number): Promise<void> {
  await api.delete(API_ENDPOINTS.doctor(id));
}
