import { Patient } from "@/entities/patient";
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
  Trash2Icon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";

export function PatientRowActions({ patient }: { patient: Patient }) {
  return (
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
        <DropdownMenuItem render={<Link href={routes.patient(patient.id)} />}>
          <UserIcon />
          Открыть карточку
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <PencilIcon />
          Редактировать
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" disabled>
          <Trash2Icon />
          Удалить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
