"use client";

import { useServices } from "@/entities/service";
import { ServiceTableView } from "./ServiceTableView";

export function ServiceTable() {
  const { data: services = [], isLoading, isError, error } = useServices();

  return (
    <div className="flex flex-col gap-4">
      {isError && (
        <p className="text-destructive text-sm">
          {error.message || "Не удалось загрузить услуги"}
        </p>
      )}

      <ServiceTableView services={services} isLoading={isLoading} />
    </div>
  );
}
