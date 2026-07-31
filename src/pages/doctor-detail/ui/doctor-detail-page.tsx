"use client";

import { useDoctor } from "@/entities/doctor";
import { DeleteDoctorDialog } from "@/features/delete-doctor";
import { EditDoctorDialog } from "@/features/edit-doctor";
import { routes } from "@/shared/config/routes";
import { EntityCardActions } from "@/shared/ui/entity-card-actions";
import { EntityDetailLayout } from "@/shared/ui/entity-detail-layout";
import { DoctorCard, DoctorCardSkeleton } from "@/widgets/doctor-card";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export function DoctorDetailPage() {
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
      skeleton={<DoctorCardSkeleton />}
    >
      {doctor && (
        <>
          <DoctorCard
            doctor={doctor}
            actions={
              <EntityCardActions
                onEdit={() => setEditOpen(true)}
                onDelete={() => setDeleteOpen(true)}
              />
            }
          />

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
        </>
      )}
    </EntityDetailLayout>
  );
}
