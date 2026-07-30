import { DOCTOR_SORT_FIELD } from "@/entities/doctor";

export const DOCTOR_TABLE_COLUMNS = [
  {
    key: "name",
    label: "Врач",
    sortField: DOCTOR_SORT_FIELD.NAME,
    sortable: true,
    className: "min-w-[200px]",
  },
  {
    key: "specialization",
    label: "Специализация",
    sortField: DOCTOR_SORT_FIELD.SPECIALIZATION,
    sortable: true,
    className: "hidden sm:table-cell",
  },
  {
    key: "experience",
    label: "Стаж",
    sortField: DOCTOR_SORT_FIELD.EXPERIENCE,
    sortable: true,
    className: "hidden md:table-cell",
  },

  {
    key: "actions",
    label: "",
    sortable: false,
    className: "w-12 text-right",
  },
] as const;
