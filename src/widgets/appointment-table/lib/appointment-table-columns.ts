export const APPOINTMENT_TABLE_COLUMNS = [
  {
    key: "date",
    label: "Дата",
    className: "min-w-[160px]",
  },
  {
    key: "patientId",
    label: "Пациент",
    className: "hidden sm:table-cell",
  },
  {
    key: "doctorId",
    label: "Врач",
    className: "hidden md:table-cell",
  },
  {
    key: "status",
    label: "Статус",
    className: "min-w-[160px]",
  },
  {
    key: "actions",
    label: "",
    className: "w-20 text-right",
  },
] as const;
