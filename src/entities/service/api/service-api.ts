import { api } from "@/shared/api";
import { API_ENDPOINTS } from "@/shared/config/api-endpoints";
import { Service } from "../types";

export async function getServices(): Promise<Service[]> {
  const { data } = await api.get<Service[]>(API_ENDPOINTS.services);
  return data;
}
