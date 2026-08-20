"use client";

import {
  formatAppointmentDate,
  type AppointmentListItem,
} from "@/entities/appointment";
import { getFullName } from "@/entities/patient";
import { ChangeAppointmentStatus } from "@/features/change-appointment-status";
import { DeleteAppointmentDialog } from "@/features/delete-appointment";
import { EditAppointmentDialog } from "@/features/edit-appointment";
import { Button } from "@/shared/ui/button";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";

type EntityAppointmentItemProps = {
  appointment: AppointmentListItem;
  counterparty: "doctor" | "patient";
};

export function EntityAppointmentItem({
  appointment,
  counterparty,
}: EntityAppointmentItemProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const counterpartyLabel =
    counterparty === "doctor"
      ? (appointment.doctor?.name ?? `#${appointment.doctorId}`)
      : appointment.patient
        ? getFullName(appointment.patient)
        : `#${appointment.patientId}`;

  return (
    <li className="flex flex-col gap-3 border-b py-3 last:border-b-0 last:pb-0 first:pt-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 space-y-1">
        <p className="font-medium">{formatAppointmentDate(appointment.date)}</p>
        <p className="text-muted-foreground truncate text-sm">
          {counterpartyLabel}
        </p>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-auto">
        <ChangeAppointmentStatus appointment={appointment} />
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
    </li>
  );
}
