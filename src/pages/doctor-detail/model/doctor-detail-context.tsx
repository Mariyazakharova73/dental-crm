"use client";

import type { Doctor } from "@/entities/doctor";
import { createContext, useContext, type ReactNode } from "react";

const DoctorDetailContext = createContext<Doctor | null>(null);

interface DoctorDetailProviderProps {
  doctor: Doctor;
  children: ReactNode;
}

export function DoctorDetailProvider({
  doctor,
  children,
}: DoctorDetailProviderProps) {
  return (
    <DoctorDetailContext.Provider value={doctor}>
      {children}
    </DoctorDetailContext.Provider>
  );
}

export function useDoctorDetail() {
  const doctor = useContext(DoctorDetailContext);

  if (!doctor) {
    throw new Error("useDoctorDetail must be used within DoctorDetailProvider");
  }

  return doctor;
}
