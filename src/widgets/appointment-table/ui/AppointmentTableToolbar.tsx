"use client";

import { CreateAppointmentDialog } from "@/features/create-appointment";

export function AppointmentTableToolbar() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
      <CreateAppointmentDialog />
    </div>
  );
}
