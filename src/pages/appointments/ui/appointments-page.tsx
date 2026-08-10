"use client";

import { AppointmentTable } from "@/widgets/appointment-table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/ui/tabs";
import { CalendarDaysIcon, TableIcon } from "lucide-react";

export function AppointmentsPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-6">
      <h1 className="text-2xl font-semibold">Записи</h1>

      <Tabs defaultValue="table" className="gap-4">
        <TabsList>
          <TabsTrigger value="table">
            <TableIcon />
            Таблица
          </TabsTrigger>
          <TabsTrigger value="calendar">
            <CalendarDaysIcon />
            Календарь
          </TabsTrigger>
        </TabsList>

        <TabsContent value="table" keepMounted>
          <AppointmentTable />
        </TabsContent>

        <TabsContent value="calendar">
          <div className="flex flex-col items-start gap-2 rounded-xl border border-dashed p-8">
            <p className="font-medium">Календарь записей</p>
            <p className="text-muted-foreground text-sm">
              Здесь будет календарь приёмов. Пока используйте вкладку «Таблица».
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
