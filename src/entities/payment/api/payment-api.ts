import { api } from "@/shared/api";
import { API_ENDPOINTS } from "@/shared/config/api-endpoints";
import { SortOrder } from "@/shared/types";
import { CreatePaymentPayload, Payment, UpdatePaymentPayload } from "../types";

interface GetPaymentsParams {
  patientId?: number;
  sort?: string;
  order?: SortOrder;
}

export async function getPayments(
  params?: GetPaymentsParams,
): Promise<Payment[]> {
  const response = await api.get<Payment[]>(`${API_ENDPOINTS.payments}`, {
    params,
  });
  return response.data;
}

export async function createPayment(payload: CreatePaymentPayload): Promise<Payment> {
  const response = await api.post<Payment>(`${API_ENDPOINTS.payments}`, payload);
  return response.data;
}

export async function updatePayment(id: number, payload: UpdatePaymentPayload): Promise<Payment> {
  const response = await api.put<Payment>(`${API_ENDPOINTS.payment(id)}`, payload);
  return response.data;
}
