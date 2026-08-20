import type { ReactNode } from "react";

interface EntityDetailHeaderProps {
  title: string;
  subtitle: string;
  actions: ReactNode;
}

export function EntityDetailHeader({
  title,
  subtitle,
  actions,
}: EntityDetailHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-muted-foreground text-sm">{subtitle}</p>
      </div>

      <div className="flex flex-wrap gap-2">{actions}</div>
    </div>
  );
}
