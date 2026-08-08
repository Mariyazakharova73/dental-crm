"use client";

import type { AppointmentListItem } from "@/entities/appointment";
import { EditAppointmentDialog } from "@/features/edit-appointment";
import { Button } from "@/shared/ui/button";
import { PencilIcon } from "lucide-react";
import { useState } from "react";

export function AppointmentRowActions({
  appointment,
}: {
  appointment: AppointmentListItem;
}) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="size-8"
        onClick={() => setEditOpen(true)}
        aria-label="Редактировать запись"
      >
        <PencilIcon />
      </Button>

      <EditAppointmentDialog
        appointment={appointment}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
    </>
  );
}
