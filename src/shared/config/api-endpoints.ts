export const API_ENDPOINTS = {
  patients: "/patients",
  patient: (id: number | string) => `/patients/${id}`,

  doctors: "/doctors",
  doctor: (id: number | string) => `/doctors/${id}`,

  appointments: "/appointments",
  appointment: (id: number | string) => `/appointments/${id}`,

  services: "/services",
  service: (id: number | string) => `/services/${id}`,

  payments: "/payments",
  payment: (id: number | string) => `/payments/${id}`,

  tasks: "/tasks",
  task: (id: number | string) => `/tasks/${id}`,
} as const;
