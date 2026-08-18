"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { AppointmentTable } from "@/widgets/appointment-table";
import { AppointmentsCalendar } from "@/widgets/appointments-calendar";
import { CalendarDaysIcon, TableIcon } from "lucide-react";

export function AppointmentsPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-6">
      <h1 className="text-2xl font-semibold">Записи</h1>

      <Tabs defaultValue="calendar" className="gap-4">
        <TabsList>
          <TabsTrigger value="calendar">
            <CalendarDaysIcon />
            Календарь
          </TabsTrigger>
          <TabsTrigger value="table">
            <TableIcon />
            Таблица
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar">
          <AppointmentsCalendar />
        </TabsContent>

        <TabsContent value="table" keepMounted>
          <AppointmentTable />
        </TabsContent>
      </Tabs>
    </main>
  );
}
