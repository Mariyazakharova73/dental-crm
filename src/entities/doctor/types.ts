export interface Doctor {
  id: number;
  name: string;
  specialization: string;
  experience: number;
}

export type CreateDoctorPayload = Omit<Doctor, "id">;

export type UpdateDoctorPayload = CreateDoctorPayload;
