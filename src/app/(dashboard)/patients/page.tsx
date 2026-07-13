"use client";

import { PatientTable } from "@/widgets/patient-table";

export default function PatientsPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-6">
      <h1 className="text-2xl font-semibold">Пациенты</h1>
      <PatientTable />
    </main>
  );
}
