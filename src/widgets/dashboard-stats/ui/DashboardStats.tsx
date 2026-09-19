"use client";

import { APPOINTMENT_STATUS, useAppointments } from "@/entities/appointment";
import { useDoctors } from "@/entities/doctor";
import { usePatients } from "@/entities/patient";
import { calcPaymentSummary, usePayments } from "@/entities/payment";
import { formatServicePrice } from "@/entities/service";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { DashboardStatsSkeleton } from "./DashboardStatsSkeleton";

function getTodayDateString() {
  const now = new Date();
  const localNow = new Date(
    now.getTime() - now.getTimezoneOffset() * 60 * 1000,
  );

  return localNow.toISOString().slice(0, 10);
}

export function DashboardStats() {
  const patientsQuery = usePatients({ limit: 1 });
  const doctorsQuery = useDoctors({ limit: 1 });
  const appointmentsQuery = useAppointments();
  const paymentsQuery = usePayments();

  const isLoading =
    patientsQuery.isLoading ||
    doctorsQuery.isLoading ||
    appointmentsQuery.isLoading ||
    paymentsQuery.isLoading;

  const isError =
    patientsQuery.isError ||
    doctorsQuery.isError ||
    appointmentsQuery.isError ||
    paymentsQuery.isError;

  const today = getTodayDateString();
  const appointments = appointmentsQuery.data?.data ?? [];
  const payments = paymentsQuery.data ?? [];

  const todayAppointments = appointments.filter(
    (appointment) =>
      appointment.date.slice(0, 10) === today &&
      appointment.status !== APPOINTMENT_STATUS.CANCELLED,
  );

  const confirmedTodayCount = todayAppointments.filter(
    (appointment) => appointment.status === APPOINTMENT_STATUS.CONFIRMED,
  ).length;

  const awaitingConfirmationCount = appointments.filter(
    (appointment) =>
      appointment.date.slice(0, 10) >= today &&
      appointment.status === APPOINTMENT_STATUS.CREATED,
  ).length;

  const paymentSummary = calcPaymentSummary(payments);

  const stats = [
    {
      label: "Пациенты",
      value: String(patientsQuery.data?.total ?? 0),
    },
    {
      label: "Врачи",
      value: String(doctorsQuery.data?.total ?? 0),
    },
    {
      label: "Записи сегодня",
      value: String(todayAppointments.length),
    },
    {
      label: "Подтверждено сегодня",
      value: String(confirmedTodayCount),
    },
    {
      label: "Ожидают подтверждения",
      value: String(awaitingConfirmationCount),
    },
    {
      label: "Оплачено всего",
      value: formatServicePrice(paymentSummary.paid),
    },
  ];

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="text-xl">Сводка</CardTitle>
        <CardDescription>Показатели клиники на сегодня</CardDescription>
      </CardHeader>

      <CardContent className="pt-4">
        {isLoading && <DashboardStatsSkeleton />}

        {isError && (
          <p className="text-destructive text-sm">
            Не удалось загрузить сводку
          </p>
        )}

        {!isLoading && !isError && (
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-muted-foreground text-xs">{stat.label}</dt>
                <dd className="text-2xl font-semibold">{stat.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </CardContent>
    </Card>
  );
}