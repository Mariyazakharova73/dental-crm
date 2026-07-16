export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  birthDate: string;
  email: string;
  comment: string;
}

export type CreatePatientPayload = Omit<Patient, "id">;