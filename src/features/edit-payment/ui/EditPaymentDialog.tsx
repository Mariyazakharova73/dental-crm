"use client";

import type { Payment } from "@/entities/payment";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { EditPaymentForm } from "./EditPaymentForm";

interface EditPaymentDialogProps {
  payment: Payment;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditPaymentDialog({
  payment,
  open,
  onOpenChange,
}: EditPaymentDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Редактирование платежа</DialogTitle>
          <DialogDescription>
            Измените сумму, дату или статус и сохраните
          </DialogDescription>
        </DialogHeader>
        {open && (
          <EditPaymentForm
            payment={payment}
            onSuccess={() => onOpenChange(false)}
            onCancel={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}