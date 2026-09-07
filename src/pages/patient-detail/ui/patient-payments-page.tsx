"use client";

import { PatientPaymentsList } from "@/widgets/patient-payments";
import { usePatientDetail } from "../model/patient-detail-context";

export function PatientPaymentsPage() {
  const patient = usePatientDetail();

  return (
    <PatientPaymentsList
      patientId={patient.id}
      description="Платежи и задолженности пациента"
    />
  );
}