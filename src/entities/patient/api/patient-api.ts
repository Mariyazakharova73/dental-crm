import { api } from "@/shared/api";
import { API_ENDPOINTS } from "@/shared/config/api-endpoints";
import { SortOrder } from "@/shared/types";
import { PaginatedResponse } from "@/shared/types/common";
import type { CreatePatientPayload, Patient } from "../types";

interface GetPatientsParams {
  q?: string;
  sort?: string;
  order?: SortOrder;
  page?: number;
  limit?: number;
}

export async function getPatients(
  params?: GetPatientsParams,
): Promise<PaginatedResponse<Patient>> {
  const response = await api.get<Patient[]>(API_ENDPOINTS.patients, {
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

export async function getPatientById(id: number): Promise<Patient> {
  const { data } = await api.get<Patient>(API_ENDPOINTS.patient(id));
  return data;
}

export async function createPatient(
  payload: CreatePatientPayload,
): Promise<Patient> {
  const { data } = await api.post<Patient>(API_ENDPOINTS.patients, payload);
  return data;
}
