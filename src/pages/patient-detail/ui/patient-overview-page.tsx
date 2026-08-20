"use client";

import { PatientContactInfo } from "@/widgets/patient-card";
import { EntityOverviewSummary } from "@/widgets/entity-overview-summary";
import { usePatientDetail } from "../model/patient-detail-context";

export function PatientOverviewPage() {
  const patient = usePatientDetail();

  return (
    <>
      <PatientContactInfo patient={patient} />
      <EntityOverviewSummary
        patientId={patient.id}
        description="Краткая статистика по пациенту"
      />
    </>
  );
}
