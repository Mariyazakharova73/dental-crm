export const SERVICE_TABLE_COLUMNS = [
  {
    key: "name",
    label: "Услуга",
    className: "min-w-[180px]",
  },
  {
    key: "price",
    label: "Цена",
    className: "hidden sm:table-cell",
  },
  {
    key: "duration",
    label: "Длительность",
    className: "hidden md:table-cell",
  },
  {
    key: "description",
    label: "Описание",
    className: "hidden lg:table-cell",
  },
] as const;
