import { APPOINTMENT_SORT_FIELD } from "@/entities/appointment";

export const APPOINTMENT_TABLE_COLUMNS = [
  {
    key: "date",
    label: "Дата",
    sortField: APPOINTMENT_SORT_FIELD.DATE,
    sortable: true,
    className: "min-w-[160px]",
  },
  {
    key: "patientId",
    label: "Пациент",
    sortField: APPOINTMENT_SORT_FIELD.PATIENT,
    sortable: true,
    className: "hidden sm:table-cell",
  },
  {
    key: "doctorId",
    label: "Врач",
    sortField: APPOINTMENT_SORT_FIELD.DOCTOR,
    sortable: true,
    className: "hidden md:table-cell",
  },
  {
    key: "status",
    label: "Статус",
    sortField: APPOINTMENT_SORT_FIELD.STATUS,
    sortable: true,
    className: "min-w-[160px]",
  },
  {
    key: "actions",
    label: "",
    sortable: false,
    className: "w-20 text-right",
  },
] as const;
