import { SortOrder } from '@/shared/types';

export interface AppointmentListParams {
  patientId?: number;
  doctorId?: number;
  sort?: string;
  order?: SortOrder;
  page?: number;
  limit?: number;
}

export const appointmentKeys = {
  all: ["appointments"] as const,
  lists: (params?: AppointmentListParams) => [...appointmentKeys.all, "list", params ?? {}] as const,
  detail: (id: number) => [...appointmentKeys.all, "detail", id] as const,
};
