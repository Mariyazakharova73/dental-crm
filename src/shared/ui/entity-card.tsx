import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import type { ReactNode } from "react";

interface EntityCardProps {
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function EntityCard({
  title,
  description,
  actions,
  children,
}: EntityCardProps) {
  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {actions ? (
            <div className="flex flex-wrap gap-2">{actions}</div>
          ) : null}
        </div>
      </CardHeader>

      <CardContent className="pt-4">{children}</CardContent>
    </Card>
  );
}
