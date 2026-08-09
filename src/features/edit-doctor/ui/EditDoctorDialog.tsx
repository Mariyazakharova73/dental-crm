"use client";

import type { Doctor } from "@/entities/doctor";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { EditDoctorForm } from "./EditDoctorForm";

interface EditDoctorDialogProps {
  doctor: Doctor;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditDoctorDialog({
  doctor,
  open,
  onOpenChange,
}: EditDoctorDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Редактирование врача</DialogTitle>
          <DialogDescription>
            Измените данные врача и сохраните
          </DialogDescription>
        </DialogHeader>
        {open && (
          <EditDoctorForm
            doctor={doctor}
            onSuccess={() => onOpenChange(false)}
            onCancel={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
