"use client";

import type { AppointmentListItem } from "@/entities/appointment";
import { DeleteAppointmentDialog } from "@/features/delete-appointment";
import { EditAppointmentDialog } from "@/features/edit-appointment";
import { Button } from "@/shared/ui/button";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";

export function AppointmentRowActions({
  appointment,
}: {
  appointment: AppointmentListItem;
}) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-end gap-0.5">
        <Button
          variant="ghost"
          size="icon"
          className="size-8"
          onClick={() => setEditOpen(true)}
          aria-label="Редактировать запись"
        >
          <PencilIcon />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive hover:text-destructive size-8"
          onClick={() => setDeleteOpen(true)}
          aria-label="Удалить запись"
        >
          <Trash2Icon />
        </Button>
      </div>

      <EditAppointmentDialog
        appointment={appointment}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
      <DeleteAppointmentDialog
        appointment={appointment}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}
