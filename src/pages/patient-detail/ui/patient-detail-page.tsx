"use client";

import { usePatient } from "@/entities/patient";
import { DeletePatientDialog } from "@/features/delete-patient";
import { EditPatientDialog } from "@/features/edit-patient";
import { routes } from "@/shared/config/routes";
import { EntityCardActions } from "@/shared/ui/entity-card-actions";
import { EntityDetailLayout } from "@/shared/ui/entity-detail-layout";
import { PatientCard, PatientCardSkeleton } from "@/widgets/patient-card";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export function PatientDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = Number(params?.id);

  const { data: patient, isLoading, isError } = usePatient(id);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const notFound = isError || !patient;

  return (
    <EntityDetailLayout
      listHref={routes.patients}
      listLabel="К списку пациентов"
      isLoading={isLoading}
      notFound={notFound}
      notFoundTitle="Пациент не найден"
      notFoundDescription="Проверьте ссылку или вернитесь к списку пациентов."
      skeleton={<PatientCardSkeleton />}
    >
      {patient && (
        <>
          <PatientCard
            patient={patient}
            actions={
              <EntityCardActions
                onEdit={() => setEditOpen(true)}
                onDelete={() => setDeleteOpen(true)}
              />
            }
          />

          <EditPatientDialog
            patient={patient}
            open={editOpen}
            onOpenChange={setEditOpen}
          />
          <DeletePatientDialog
            patient={patient}
            open={deleteOpen}
            onOpenChange={setDeleteOpen}
            onSuccess={() => router.push(routes.patients)}
          />
        </>
      )}
    </EntityDetailLayout>
  );
}
