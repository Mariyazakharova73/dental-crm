export type Weekday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

// [start, end], например ["09:00", "17:00"]
export type ScheduleInterval = [string, string];

export type DoctorSchedule = Partial<Record<Weekday, ScheduleInterval>>;

export interface Doctor {
  id: number;
  name: string;
  specialization: string;
  experience: number;
  schedule: DoctorSchedule;
}

export type CreateDoctorPayload = Omit<Doctor, "id">;

export type UpdateDoctorPayload = CreateDoctorPayload;
