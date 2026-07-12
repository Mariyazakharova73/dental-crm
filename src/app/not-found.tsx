import { ArrowLeftIcon, Stethoscope } from "lucide-react";
import Link from "next/link";

import { routes } from "@/shared/config/routes";
import { Button } from "@/shared/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-full flex-1 flex-col items-center justify-center gap-6 p-6 text-center">
      <div className="bg-primary text-primary-foreground flex size-16 items-center justify-center rounded-2xl">
        <Stethoscope className="size-8" />
      </div>

      <div className="flex max-w-md flex-col gap-2">
        <p className="text-primary text-sm font-medium">404</p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Страница не найдена
        </h1>
        <p className="text-muted-foreground text-sm">
          Запрашиваемая страница не существует или была перемещена.
        </p>
      </div>

      <Button nativeButton={false} render={<Link href={routes.home} />}>
        <ArrowLeftIcon />
        На главную
      </Button>
    </main>
  );
}
