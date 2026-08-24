"use client";

import { useDeleteAppointment, type Appointment } from "@/entities/appointment";
import { formatDateTime } from "@/shared/lib/date/format-date";
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

interface DeleteAppointmentDialogProps {
  appointment: Appointment;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeleteAppointmentDialog({
  appointment,
  open,
  onOpenChange,
  onSuccess,
}: DeleteAppointmentDialogProps) {
  const { mutate, isPending, isError, error, reset } = useDeleteAppointment();

  const handleDelete = () => {
    mutate(appointment.id, {
      onSuccess: () => {
        reset();
        toast.success("Запись удалена");
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
          <AlertDialogTitle>Удалить запись?</AlertDialogTitle>
          <AlertDialogDescription>
            Запись на {formatDateTime(appointment.date)} будет удалена без
            возможности восстановления.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {isError && (
          <p className="text-destructive text-sm">
            {error.message || "Не удалось удалить запись"}
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
