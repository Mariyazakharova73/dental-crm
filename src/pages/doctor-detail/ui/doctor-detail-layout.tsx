"use client";

import { useDoctor } from "@/entities/doctor";
import { DeleteDoctorDialog } from "@/features/delete-doctor";
import { EditDoctorDialog } from "@/features/edit-doctor";
import { routes } from "@/shared/config/routes";
import { EntityCardActions } from "@/shared/ui/entity-card-actions";
import { EntityDetailHeader } from "@/shared/ui/entity-detail-header";
import { EntityDetailLayout } from "@/shared/ui/entity-detail-layout";
import { EntityDetailNav } from "@/shared/ui/entity-detail-nav";
import { EntityDetailSkeleton } from "@/shared/ui/entity-detail-skeleton";
import { useParams, useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { DoctorDetailProvider } from "../model/doctor-detail-context";

interface DoctorDetailLayoutProps {
  children: ReactNode;
}

const doctorNavItems = (doctorId: number) =>
  [
    { label: "Обзор", href: routes.doctor(doctorId), exact: true },
    { label: "Записи", href: routes.doctorAppointments(doctorId) },
  ] as const;

export function DoctorDetailLayout({ children }: DoctorDetailLayoutProps) {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = Number(params?.id);

  const { data: doctor, isLoading, isError } = useDoctor(id);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const notFound = isError || !doctor;

  return (
    <EntityDetailLayout
      listHref={routes.doctors}
      listLabel="К списку врачей"
      isLoading={isLoading}
      notFound={notFound}
      notFoundTitle="Врач не найден"
      notFoundDescription="Проверьте ссылку или вернитесь к списку врачей."
      skeleton={<EntityDetailSkeleton tabCount={2} cardCount={2} />}
    >
      {doctor && (
        <DoctorDetailProvider doctor={doctor}>
          <div className="flex flex-col gap-4">
            <EntityDetailHeader
              title={doctor.name}
              subtitle={doctor.specialization}
              actions={
                <EntityCardActions
                  onEdit={() => setEditOpen(true)}
                  onDelete={() => setDeleteOpen(true)}
                />
              }
            />

            <EntityDetailNav
              ariaLabel="Разделы карточки врача"
              items={doctorNavItems(doctor.id)}
            />

            <div className="flex flex-col gap-4">{children}</div>
          </div>

          <EditDoctorDialog
            doctor={doctor}
            open={editOpen}
            onOpenChange={setEditOpen}
          />
          <DeleteDoctorDialog
            doctor={doctor}
            open={deleteOpen}
            onOpenChange={setDeleteOpen}
            onSuccess={() => router.push(routes.doctors)}
          />
        </DoctorDetailProvider>
      )}
    </EntityDetailLayout>
  );
}
