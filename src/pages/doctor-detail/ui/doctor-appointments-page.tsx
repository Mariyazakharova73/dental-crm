"use client";

import { EntityAppointmentsList } from "@/widgets/entity-appointments";
import { useDoctorDetail } from "../model/doctor-detail-context";

export function DoctorAppointmentsPage() {
  const doctor = useDoctorDetail();

  return (
    <EntityAppointmentsList
      doctorId={doctor.id}
      counterparty="patient"
      description="Приёмы этого врача"
    />
  );
}
