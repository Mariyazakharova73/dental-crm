"use client";

import { useDeleteDoctor, type Doctor } from "@/entities/doctor";
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

interface DeleteDoctorDialogProps {
  doctor: Doctor;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeleteDoctorDialog({
  doctor,
  open,
  onOpenChange,
  onSuccess,
}: DeleteDoctorDialogProps) {
  const { mutate, isPending, isError, error, reset } = useDeleteDoctor();

  const handleDelete = () => {
    mutate(doctor.id, {
      onSuccess: () => {
        reset();
        toast.success("Врач удалён");
        onOpenChange(false);
        onSuccess?.();
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
          <AlertDialogTitle>Удалить врача?</AlertDialogTitle>
          <AlertDialogDescription>
            Врач {doctor.name} будет удалён без возможности восстановления.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {isError && (
          <p className="text-destructive text-sm">
            {error.message || "Не удалось удалить врача"}
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
