"use client";

import type { Doctor } from "@/entities/doctor";
import { DeleteDoctorDialog } from "@/features/delete-doctor";
import { EditDoctorDialog } from "@/features/edit-doctor";
import { routes } from "@/shared/config/routes";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import {
  MoreHorizontalIcon,
  PencilIcon,
  StethoscopeIcon,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function DoctorRowActions({ doctor }: { doctor: Doctor }) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" size="icon" className="size-8">
              <MoreHorizontalIcon />
              <span className="sr-only">Действия</span>
            </Button>
          }
        />
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem render={<Link href={routes.doctor(doctor.id)} />}>
            <StethoscopeIcon />
            Открыть карточку
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            <PencilIcon />
            Редактировать
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2Icon />
            Удалить
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditDoctorDialog
        doctor={doctor}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
      <DeleteDoctorDialog
        doctor={doctor}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}
