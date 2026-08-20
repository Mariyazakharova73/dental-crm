"use client";

import type { Patient } from "@/entities/patient";
import { createContext, useContext, type ReactNode } from "react";

const PatientDetailContext = createContext<Patient | null>(null);

interface PatientDetailProviderProps {
  patient: Patient;
  children: ReactNode;
}

export function PatientDetailProvider({
  patient,
  children,
}: PatientDetailProviderProps) {
  return (
    <PatientDetailContext.Provider value={patient}>
      {children}
    </PatientDetailContext.Provider>
  );
}

export function usePatientDetail() {
  const patient = useContext(PatientDetailContext);

  if (!patient) {
    throw new Error("usePatientDetail must be used within PatientDetailProvider");
  }

  return patient;
}
