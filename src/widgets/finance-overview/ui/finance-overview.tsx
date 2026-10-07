"use client";

import { getFullName, usePatients } from "@/entities/patient";
import { calcPaymentSummary, usePayments } from "@/entities/payment";
import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { useMemo, useState } from "react";
import { PaymentFilters } from "./payment-filters";
import { PaymentList } from "./payment-list";
import { SummaryCards } from "./summary-cards";

const ALL_STATUSES = "all";

export function FinanceOverview() {
  const [statusFilter, setStatusFilter] = useState(ALL_STATUSES);
  const [search, setSearch] = useState("");
  const paymentsQuery = usePayments({ sort: "date", order: "desc" });
  const patientsQuery = usePatients();
  const payments = paymentsQuery.data ?? [];
  const patients = patientsQuery.data?.data ?? [];

  const filteredPayments = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("ru");

    return payments.filter((payment) => {
      const patient = patients.find((item) => item.id === payment.patientId);
      const matchesStatus =
        statusFilter === ALL_STATUSES || payment.status === statusFilter;
      const matchesSearch =
        !normalizedSearch ||
        (patient &&
          getFullName(patient)
            .toLocaleLowerCase("ru")
            .includes(normalizedSearch));

      return matchesStatus && matchesSearch;
    });
  }, [payments, patients, search, statusFilter]);

  const summary = useMemo(() => calcPaymentSummary(payments), [payments]);
  const isLoading = paymentsQuery.isLoading || patientsQuery.isLoading;
  const hasError = paymentsQuery.isError || patientsQuery.isError;
  const errorMessage = hasError
    ? paymentsQuery.error?.message ||
      patientsQuery.error?.message ||
      "Не удалось загрузить финансовые данные"
    : undefined;

  return (
    <div className="flex flex-col gap-6">
      <SummaryCards {...summary} />

      <Card>
        <CardHeader className="border-b">
          <CardTitle>Платежи</CardTitle>
          <CardDescription>
            Сводка учитывает суммы записей по статусам. Остаток долга по
            частичным платежам здесь не рассчитывается.
          </CardDescription>
          <PaymentFilters
            search={search}
            statusFilter={statusFilter}
            onSearchChange={setSearch}
            onStatusChange={(value) => setStatusFilter(value || ALL_STATUSES)}
          />
        </CardHeader>
        <PaymentList
          payments={filteredPayments}
          patients={patients}
          allPaymentsCount={payments.length}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
      </Card>
    </div>
  );
}
