"use client";

import {
  getFullName,
  useDeletePatient,
  type Patient,
} from "@/entities/patient";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/ui/alert-dialog";
import { toast } from "sonner";

interface DeletePatientDialogProps {
  patient: Patient;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeletePatientDialog({
  patient,
  open,
  onOpenChange,
}: DeletePatientDialogProps) {
  const { mutate, isPending, isError, error, reset } = useDeletePatient();

  const handleDelete = () => {
    mutate(patient.id, {
      onSuccess: () => {
        reset();
        toast.success("Пациент удалён");
        onOpenChange(false);
      },
    });
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(next) => {
        if (!next) reset();
        onOpenChange(next);
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Удалить пациента?</AlertDialogTitle>
          <AlertDialogDescription>
            Пациент {getFullName(patient)} будет удалён без возможности
            восстановления.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {isError && (
          <p className="text-destructive text-sm">
            {error.message || "Не удалось удалить пациента"}
          </p>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Отмена</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={isPending}
            onClick={handleDelete}
          >
            {isPending ? "Удаление…" : "Удалить"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
