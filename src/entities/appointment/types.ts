import type { Doctor } from "@/entities/doctor";
import type { Patient } from "@/entities/patient";
import type { ValueOf } from "@/shared/types";

export const APPOINTMENT_STATUS = {
  CREATED: "created",
  CONFIRMED: "confirmed",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;

export type AppointmentStatus = ValueOf<typeof APPOINTMENT_STATUS>;

export interface Appointment {
  id: number;
  patientId: number;
  doctorId: number;
  serviceId: number;
  date: string;
  status: AppointmentStatus;
  comment: string;
}

/** Ответ списка с json-server `?_expand=patient&_expand=doctor` */
export interface AppointmentListItem extends Appointment {
  patient?: Patient;
  doctor?: Doctor;
}
