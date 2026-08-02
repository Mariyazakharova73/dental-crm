import {
  APPOINTMENT_STATUS,
  type AppointmentStatus,
} from "../types";

export const APPOINTMENT_STATUS_LABEL: Record<AppointmentStatus, string> = {
  [APPOINTMENT_STATUS.CREATED]: "Создана",
  [APPOINTMENT_STATUS.CONFIRMED]: "Подтверждена",
  [APPOINTMENT_STATUS.COMPLETED]: "Завершена",
  [APPOINTMENT_STATUS.CANCELLED]: "Отменена",
};
