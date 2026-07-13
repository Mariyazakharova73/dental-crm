import { PATIENT_SORT_FIELD } from "@/entities/patient";

export const PATIENT_TABLE_COLUMNS = [
  {
    key: "name",
    label: "Пациент",
    sortField: PATIENT_SORT_FIELD.NAME,
    sortable: true,
    className: "min-w-[200px]",
  },
  {
    key: "phone",
    label: "Телефон",
    sortable: false,
    className: "hidden md:table-cell",
  },
  {
    key: "email",
    label: "Email",
    sortField: PATIENT_SORT_FIELD.EMAIL,
    sortable: true,
    className: "hidden lg:table-cell",
  },
  {
    key: "birthDate",
    label: "Дата рождения",
    sortField: PATIENT_SORT_FIELD.BIRTH_DATE,
    sortable: true,
    className: "hidden sm:table-cell",
  },
  {
    key: "actions",
    label: "",
    sortable: false,
    className: "w-12 text-right",
  },
] as const;
