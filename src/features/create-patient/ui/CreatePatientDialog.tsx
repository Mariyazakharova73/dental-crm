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
import { CreatePatientForm } from "./CreatePatientForm";

export function CreatePatientDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)}>
        <PlusIcon />
        Добавить пациента
      </Button>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Новый пациент</DialogTitle>
          <DialogDescription>Заполните данные пациента</DialogDescription>
        </DialogHeader>
        {open && (
          <CreatePatientForm
            onSuccess={() => setOpen(false)}
            onCancel={() => setOpen(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
