import { differenceInYears, format, parseISO } from "date-fns";
import { Patient } from "../types";

export function getFullName(patient: Patient) {
  return `${patient.lastName} ${patient.firstName}`;
}

export function formatBirthDate(date: string) {
  return format(parseISO(date), "dd.MM.yyyy");
}

function formatAge(years: number) {
  const mod10 = years % 10;
  const mod100 = years % 100;

  if (mod100 >= 11 && mod100 <= 14) return `${years} лет`;
  if (mod10 === 1) return `${years} год`;
  if (mod10 >= 2 && mod10 <= 4) return `${years} года`;
  return `${years} лет`;
}

export function getPatientAge(birthDate: string) {
  return differenceInYears(new Date(), parseISO(birthDate));
}

export function getPatientSubtitle(patient: Patient) {
  const age = formatAge(getPatientAge(patient.birthDate));
  return `${patient.phone} · ${age}`;
}
