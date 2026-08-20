"use client";

import { ServiceTable } from "@/widgets/service-table";

export function ServicesPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Услуги</h1>
        <p className="text-muted-foreground text-sm">
          Каталог услуг клиники с ценами и длительностью
        </p>
      </div>

      <ServiceTable />
    </main>
  );
}
