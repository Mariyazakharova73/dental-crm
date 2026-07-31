"use client";

import { useDoctor } from "@/entities/doctor";
import { DeleteDoctorDialog } from "@/features/delete-doctor";
import { EditDoctorDialog } from "@/features/edit-doctor";
import { routes } from "@/shared/config/routes";
import { Button } from "@/shared/ui/button";
import { DoctorCard, DoctorCardSkeleton } from "@/widgets/doctor-card";
import { ArrowLeftIcon, PencilIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export function DoctorDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = Number(params?.id);

  const { data: doctor, isLoading, isError } = useDoctor(id);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 p-6">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          render={<Link href={routes.doctors} />}
        >
          <ArrowLeftIcon /> К списку
        </Button>
      </div>

      {isLoading && <DoctorCardSkeleton />}

      {!isLoading && (isError || !doctor) && (
        <div className="flex flex-col items-start gap-3 rounded-xl border border-dashed p-8">
          <h1 className="text-xl font-semibold">Врач не найден</h1>
          <p className="text-muted-foreground text-sm">
            Проверьте ссылку или вернитесь к списку врачей.
          </p>
          <Button render={<Link href={routes.doctors} />}>
            К списку врачей
          </Button>
        </div>
      )}

      {doctor && (
        <>
          <DoctorCard
            doctor={doctor}
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
    </main>
  );
}
