export const appointmentKeys = {
  all: ["appointments"] as const,
  lists: () => [...appointmentKeys.all, "list"] as const,
  detail: (id: number) => [...appointmentKeys.all, "detail", id] as const,
};
