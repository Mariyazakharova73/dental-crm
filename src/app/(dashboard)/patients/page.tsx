"use client";

import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import {
  MoreHorizontalIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
  Trash2Icon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { useDeferredValue, useEffect, useMemo, useState } from "react";

import { routes } from "@/shared/config/routes";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Input } from "@/shared/ui/input";
import { Skeleton } from "@/shared/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  birthDate: string;
  email: string;
  comment: string;
}

const API_URL = "http://localhost:3001/patients";

async function fetchPatients(): Promise<Patient[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Не удалось загрузить пациентов");
  return res.json();
}

const MOCK_PATIENTS: Patient[] = [
  {
    id: 1,
    firstName: "Анна",
    lastName: "Иванова",
    phone: "+7 (999) 123-45-67",
    birthDate: "1990-05-15",
    email: "anna.ivanova@mail.ru",
    comment: "Аллергия на лидокаин",
  },
  {
    id: 2,
    firstName: "Дмитрий",
    lastName: "Петров",
    phone: "+7 (999) 234-56-78",
    birthDate: "1985-11-22",
    email: "dmitry.petrov@mail.ru",
    comment: "",
  },
];

function getFullName(patient: Patient) {
  return `${patient.lastName} ${patient.firstName}`;
}

function formatBirthDate(date: string) {
  return format(parseISO(date), "d MMMM yyyy", { locale: ru });
}

function filterPatients(patients: Patient[], query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return patients;

  return patients.filter((p) =>
    [p.firstName, p.lastName, p.phone, p.email, p.comment]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
}

const COLUMNS = [
  { key: "name", label: "Пациент", className: "min-w-[200px]" },
  { key: "phone", label: "Телефон", className: "hidden md:table-cell" },
  { key: "email", label: "Email", className: "hidden lg:table-cell" },
  {
    key: "birthDate",
    label: "Дата рождения",
    className: "hidden sm:table-cell",
  },
  { key: "actions", label: "", className: "w-12 text-right" },
] as const;

function PatientTableSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <TableRow key={i}>
          <TableCell>
            <Skeleton className="h-4 w-40" />
          </TableCell>
          <TableCell className="hidden md:table-cell">
            <Skeleton className="h-4 w-32" />
          </TableCell>
          <TableCell className="hidden lg:table-cell">
            <Skeleton className="h-4 w-48" />
          </TableCell>
          <TableCell className="hidden sm:table-cell">
            <Skeleton className="h-4 w-28" />
          </TableCell>
          <TableCell>
            <Skeleton className="ml-auto size-8 rounded-lg" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

function PatientRowActions({ patient }: { patient: Patient }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon" className="size-8">
            <MoreHorizontalIcon />
            <span className="sr-only">Действия</span>
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuItem render={<Link href={routes.patient(patient.id)} />}>
          <UserIcon />
          Открыть карточку
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <PencilIcon />
          Редактировать
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" disabled>
          <Trash2Icon />
          Удалить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function PatientTable() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const deferredSearch = useDeferredValue(search);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchPatients();
        if (!cancelled) setPatients(data);
      } catch {
        if (!cancelled) {
          setPatients(MOCK_PATIENTS);
          setError("API недоступен, показаны тестовые данные");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredPatients = useMemo(
    () => filterPatients(patients, deferredSearch),
    [patients, deferredSearch],
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <SearchIcon className="text-muted-foreground absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
          <Input
            placeholder="Поиск по имени, телефону, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>

        <Button
          nativeButton={false}
          render={<Link href={routes.patientsCreate} />}
        >
          <PlusIcon />
          Добавить пациента
        </Button>
      </div>

      {error && <p className="text-muted-foreground text-sm">{error}</p>}

      {/* Table */}
      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              {COLUMNS.map((col) => (
                <TableHead key={col.key} className={col.className}>
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading && <PatientTableSkeleton />}

            {!isLoading && filteredPatients.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={COLUMNS.length}
                  className="text-muted-foreground h-24 text-center"
                >
                  {search ? "Ничего не найдено" : "Список пациентов пуст"}
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>
                    <Link
                      href={routes.patient(patient.id)}
                      className="hover:text-primary font-medium transition-colors"
                    >
                      {getFullName(patient)}
                    </Link>
                    {patient.comment && (
                      <p className="text-muted-foreground mt-0.5 line-clamp-1 text-xs">
                        {patient.comment}
                      </p>
                    )}
                  </TableCell>

                  <TableCell className="hidden md:table-cell">
                    {patient.phone}
                  </TableCell>

                  <TableCell className="hidden lg:table-cell">
                    {patient.email}
                  </TableCell>

                  <TableCell className="hidden sm:table-cell">
                    {formatBirthDate(patient.birthDate)}
                  </TableCell>

                  <TableCell className="text-right">
                    <PatientRowActions patient={patient} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {!isLoading && (
        <p className="text-muted-foreground text-sm">
          Показано {filteredPatients.length} из {patients.length}
        </p>
      )}
    </div>
  );
}

export default function PatientsPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-6">
      <h1 className="text-2xl font-semibold">Пациенты</h1>
      <PatientTable />
    </main>
  );
}
