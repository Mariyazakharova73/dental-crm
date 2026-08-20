"use client";

import { EntityAppointmentsList } from "@/widgets/entity-appointments";
import { usePatientDetail } from "../model/patient-detail-context";

export function PatientAppointmentsPage() {
  const patient = usePatientDetail();

  return (
    <EntityAppointmentsList
      patientId={patient.id}
      counterparty="doctor"
      description="Приёмы этого пациента"
    />
  );
}
