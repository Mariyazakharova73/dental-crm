"use client";

import { getFullName, getPatientSubtitle, usePatient } from "@/entities/patient";
import { DeletePatientDialog } from "@/features/delete-patient";
import { EditPatientDialog } from "@/features/edit-patient";
import { routes } from "@/shared/config/routes";
import { EntityCardActions } from "@/shared/ui/entity-card-actions";
import { EntityDetailHeader } from "@/shared/ui/entity-detail-header";
import { EntityDetailLayout } from "@/shared/ui/entity-detail-layout";
import { EntityDetailNav } from "@/shared/ui/entity-detail-nav";
import { EntityDetailSkeleton } from "@/shared/ui/entity-detail-skeleton";
import { useParams, useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { PatientDetailProvider } from "../model/patient-detail-context";

interface PatientDetailLayoutProps {
  children: ReactNode;
}

const patientNavItems = (patientId: number) =>
  [
    { label: "Обзор", href: routes.patient(patientId), exact: true },
    { label: "Записи", href: routes.patientAppointments(patientId) },
    { label: "Финансы", href: routes.patientPayments(patientId) },
    { label: "Документы", href: routes.patientDocuments(patientId) },
  ] as const;

export function PatientDetailLayout({ children }: PatientDetailLayoutProps) {
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
      skeleton={<EntityDetailSkeleton tabCount={4} cardCount={2} />}
    >
      {patient && (
        <PatientDetailProvider patient={patient}>
          <div className="flex flex-col gap-4">
            <EntityDetailHeader
              title={getFullName(patient)}
              subtitle={getPatientSubtitle(patient)}
              actions={
                <EntityCardActions
                  onEdit={() => setEditOpen(true)}
                  onDelete={() => setDeleteOpen(true)}
                />
              }
            />

            <EntityDetailNav
              ariaLabel="Разделы карточки пациента"
              items={patientNavItems(patient.id)}
            />

            <div className="flex flex-col gap-4">{children}</div>
          </div>

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
        </PatientDetailProvider>
      )}
    </EntityDetailLayout>
  );
}
