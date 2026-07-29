"use client";

import { usePatient } from "@/entities/patient";
import { DeletePatientDialog } from "@/features/delete-patient";
import { EditPatientDialog } from "@/features/edit-patient";
import { routes } from "@/shared/config/routes";
import { Button } from "@/shared/ui/button";
import { PatientCard, PatientCardSkeleton } from "@/widgets/patient-card";

import { ArrowLeftIcon, PencilIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export function PatientDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = Number(params?.id);

  const { data: patient, isLoading, isError } = usePatient(id);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 p-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          render={<Link href={routes.patients} />}
        >
          <ArrowLeftIcon /> К списку
        </Button>
      </div>

      {isLoading && <PatientCardSkeleton />}

      {!isLoading && (isError || !patient) && (
        <div className="flex flex-col items-start gap-3 rounded-xl border border-dashed p-8">
          <h1 className="text-xl font-semibold">Пациент не найден</h1>
          <p className="text-muted-foreground text-sm">
            Проверьте ссылку или вернитесь к списку пациентов.
          </p>
          <Button render={<Link href={routes.patients} />}>
            К списку пациентов
          </Button>
        </div>
      )}

      {patient && (
        <>
          <PatientCard
            patient={patient}
            actions={
              <>
                <Button variant="outline" onClick={() => setEditOpen(true)}>
                  <PencilIcon />
                  Редактировать
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setDeleteOpen(true)}
                >
                  <Trash2Icon />
                  Удалить
                </Button>
              </>
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
    </main>
  );
}
