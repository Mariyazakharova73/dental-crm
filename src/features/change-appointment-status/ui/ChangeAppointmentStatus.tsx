"use client";

import {
  APPOINTMENT_STATUS,
  APPOINTMENT_STATUS_LABEL,
  useUpdateAppointment,
  type Appointment,
  type AppointmentStatus,
} from "@/entities/appointment";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { toast } from "sonner";

const STATUS_OPTIONS = Object.values(APPOINTMENT_STATUS);

interface ChangeAppointmentStatusProps {
  appointment: Appointment;
}

export function ChangeAppointmentStatus({
  appointment,
}: ChangeAppointmentStatusProps) {
  const { mutate, isPending } = useUpdateAppointment();

  const handleChange = (value: string | null) => {
    if (!value || value === appointment.status) return;

    const status = value as AppointmentStatus;

    mutate(
      {
        id: appointment.id,
        payload: {
          patientId: appointment.patientId,
          doctorId: appointment.doctorId,
          serviceId: appointment.serviceId,
          date: appointment.date,
          comment: appointment.comment,
          status,
        },
      },
      {
        onSuccess: () => {
          toast.success("Статус обновлён");
        },
        onError: (error) => {
          toast.error(error.message || "Не удалось сменить статус");
        },
      },
    );
  };

  return (
    <Select
      value={appointment.status}
      onValueChange={handleChange}
      disabled={isPending}
    >
      <SelectTrigger
        className="h-8 w-[160px]"
        size="sm"
        aria-label="Статус записи"
      >
        <SelectValue>
          {APPOINTMENT_STATUS_LABEL[appointment.status]}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {STATUS_OPTIONS.map((status) => (
          <SelectItem key={status} value={status}>
            {APPOINTMENT_STATUS_LABEL[status]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
