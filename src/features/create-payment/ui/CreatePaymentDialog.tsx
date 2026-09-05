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
import { CreatePaymentForm } from "./CreatePaymentForm";

interface CreatePaymentDialogProps {
  patientId: number;
}

export function CreatePaymentDialog({ patientId }: CreatePaymentDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)}>
        <PlusIcon />
        Добавить платёж
      </Button>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Новый платёж</DialogTitle>
          <DialogDescription>Укажите сумму, дату и статус</DialogDescription>
        </DialogHeader>
        {open && (
          <CreatePaymentForm
            patientId={patientId}
            onSuccess={() => setOpen(false)}
            onCancel={() => setOpen(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
