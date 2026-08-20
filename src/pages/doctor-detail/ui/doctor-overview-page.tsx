"use client";

import { DoctorContactInfo } from "@/widgets/doctor-card";
import { EntityOverviewSummary } from "@/widgets/entity-overview-summary";
import { useDoctorDetail } from "../model/doctor-detail-context";

export function DoctorOverviewPage() {
  const doctor = useDoctorDetail();

  return (
    <>
      <DoctorContactInfo doctor={doctor} />
      <EntityOverviewSummary
        doctorId={doctor.id}
        description="Краткая статистика по приёмам"
      />
    </>
  );
}
