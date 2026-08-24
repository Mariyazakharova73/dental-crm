import { Button } from "@/shared/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

interface EntityDetailLayoutProps {
  listHref: string;
  listLabel: string;
  isLoading: boolean;
  notFound: boolean;
  notFoundTitle: string;
  notFoundDescription: string;
  skeleton: ReactNode;
  children?: ReactNode;
}

export function EntityDetailLayout({
  listHref,
  listLabel,
  isLoading,
  notFound,
  notFoundTitle,
  notFoundDescription,
  skeleton,
  children,
}: EntityDetailLayoutProps) {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 p-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          nativeButton={false}
          render={<Link href={listHref} />}
        >
          <ArrowLeftIcon /> К списку
        </Button>
      </div>

      {isLoading && skeleton}

      {!isLoading && notFound && (
        <div className="flex flex-col items-start gap-3 rounded-xl border border-dashed p-8">
          <h1 className="text-xl font-semibold">{notFoundTitle}</h1>
          <p className="text-muted-foreground text-sm">{notFoundDescription}</p>
          <Button nativeButton={false} render={<Link href={listHref} />}>{listLabel}</Button>
        </div>
      )}

      {!isLoading && !notFound ? children : null}
    </main>
  );
}
