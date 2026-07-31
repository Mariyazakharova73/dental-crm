import { Button } from "@/shared/ui/button";
import { PencilIcon, Trash2Icon } from "lucide-react";

interface EntityCardActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function EntityCardActions({ onEdit, onDelete }: EntityCardActionsProps) {
  return (
    <>
      <Button variant="outline" onClick={onEdit}>
        <PencilIcon />
        Редактировать
      </Button>
      <Button variant="destructive" onClick={onDelete}>
        <Trash2Icon />
        Удалить
      </Button>
    </>
  );
}
