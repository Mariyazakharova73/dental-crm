"use client";

import {
  formatServiceDuration,
  formatServicePrice,
  type Service,
} from "@/entities/service";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Clock3, CircleDollarSign } from "lucide-react";

interface ServiceTableViewProps {
  services: Service[];
  isLoading: boolean;
}

export function ServiceTableView({
  services,
  isLoading,
}: ServiceTableViewProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="bg-card h-44 animate-pulse rounded-xl border shadow-md"
          />
        ))}
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="bg-card text-muted-foreground flex min-h-44 items-center justify-center rounded-xl border shadow-md">
        Каталог услуг пуст
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {services.map((service) => (
        <Card
          key={service.id}
          className="gap-0 transition-shadow hover:shadow-lg"
        >
          <CardHeader className="gap-2 border-b pb-4">
            <CardTitle className="text-lg leading-snug">{service.name}</CardTitle>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="bg-primary/10 text-primary inline-flex items-center gap-1 rounded-md px-2 py-1 font-semibold">
                <CircleDollarSign className="size-4" />
                {formatServicePrice(service.price)}
              </span>
              <span className="bg-muted text-muted-foreground inline-flex items-center gap-1 rounded-md px-2 py-1">
                <Clock3 className="size-4" />
                {formatServiceDuration(service.duration)}
              </span>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
              {service.description || "Описание услуги не добавлено"}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
