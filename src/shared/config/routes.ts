export const routes = {
  home: "/dashboard",
  patients: "/patients",
  patientsCreate: "/patients/create",
  patient: (id: number | string) => `/patients/${id}`,

  doctors: "/doctors",
  doctorsCreate: "/doctors/create",
  doctor: (id: number | string) => `/doctors/${id}`,

  appointments: "/appointments",
  appointmentsCreate: "/appointments/create",
  appointment: (id: number | string) => `/appointments/${id}`,

  services: "/services",
  servicesCreate: "/services/create",

  finance: "/finance",
  tasks: "/tasks",
  task: (id: number | string) => `/tasks/${id}`,
} as const;

export type AppRoute = (typeof routes)[keyof typeof routes];
