import { FileQuestionIcon } from "lucide-react";
import Link from "next/link";

import { routes } from "@/shared/config/routes";
import { Button } from "@/shared/ui/button";

export function DashboardNotFoundPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-16 text-center">
      <FileQuestionIcon className="text-muted-foreground size-12" />
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold">Страница не найдена</h1>
        <p className="text-muted-foreground text-sm">
          Раздел не существует или был удалён.
        </p>
      </div>
      <Button
        nativeButton={false}
        variant="outline"
        render={<Link href={routes.home} />}
      >
        Вернуться на главную
      </Button>
    </div>
  );
}
