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
import { CreateDoctorForm } from "./CreateDoctorForm";

export function CreateDoctorDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)}>
        <PlusIcon />
        Добавить врача
      </Button>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Новый врач</DialogTitle>
          <DialogDescription>Заполните данные врача</DialogDescription>
        </DialogHeader>
        {open && (
          <CreateDoctorForm
            onSuccess={() => setOpen(false)}
            onCancel={() => setOpen(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
