import { format, parseISO } from 'date-fns';
import { Patient } from '../types';


export function getFullName(patient: Patient) {
  return `${patient.lastName} ${patient.firstName}`;
}

export function formatBirthDate(date: string) {
  return format(parseISO(date), "dd.MM.yyyy");
}
