"use client";

import { DashboardStats } from "@/widgets/dashboard-stats";

export function DashboardPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Главная</h1>
        <p className="text-muted-foreground text-sm">Сводка по клинике</p>
      </div>
      <DashboardStats />
    </main>
  );
}
