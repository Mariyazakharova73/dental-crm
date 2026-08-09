"use client";

import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { CreateAppointmentForm } from "./CreateAppointmentForm";

interface CreateAppointmentDialogProps {
  patientId?: number;
}

export function CreateAppointmentDialog({
  patientId,
}: CreateAppointmentDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)}>
        <PlusIcon />
        Добавить запись
      </Button>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Новая запись</DialogTitle>
          <DialogDescription>Заполните данные записи</DialogDescription>
        </DialogHeader>
        {open && (
          <CreateAppointmentForm
            patientId={patientId}
            onSuccess={() => setOpen(false)}
            onCancel={() => setOpen(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
