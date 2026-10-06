"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  PAYMENT_STATUS,
  PAYMENT_STATUS_LABEL,
  PaymentStatusBadge,
  calcPaymentSummary,
  usePayments,
  type Payment,
  type PaymentStatus,
} from "@/entities/payment";
import { getFullName, usePatients } from "@/entities/patient";
import { formatServicePrice } from "@/entities/service";
import { ChangePaymentStatus } from "@/features/change-payment-status";
import { EditPaymentDialog } from "@/features/edit-payment";
import { routes } from "@/shared/config/routes";
import { formatDate } from "@/shared/lib/date/format-date";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

const ALL_STATUSES = "all";

function FinancePaymentRow({
  payment,
  patientName,
}: {
  payment: Payment;
  patientName: string;
}) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <tr className="border-b last:border-0">
      <td className="px-4 py-3 whitespace-nowrap">{formatDate(payment.date)}</td>
      <td className="px-4 py-3">
        <Link
          className="font-medium underline-offset-4 hover:underline"
          href={routes.patient(payment.patientId)}
        >
          {patientName}
        </Link>
      </td>
      <td className="px-4 py-3 text-right font-medium whitespace-nowrap">
        {formatServicePrice(payment.amount)}
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap items-center justify-end gap-2">
          <PaymentStatusBadge status={payment.status} />
          <ChangePaymentStatus payment={payment} />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setEditOpen(true)}
            aria-label={`Редактировать платёж пациента ${patientName}`}
          >
            Изменить
          </Button>
        </div>
        <EditPaymentDialog
          payment={payment}
          open={editOpen}
          onOpenChange={setEditOpen}
        />
      </td>
    </tr>
  );
}

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
        (patient && getFullName(patient).toLocaleLowerCase("ru").includes(normalizedSearch));
      return matchesStatus && matchesSearch;
    });
  }, [payments, patients, search, statusFilter]);

  const summary = useMemo(() => calcPaymentSummary(payments), [payments]);
  const isError = paymentsQuery.isError || patientsQuery.isError;
  const errorMessage = paymentsQuery.error?.message || patientsQuery.error?.message;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Всего платежей" value={formatServicePrice(summary.total)} />
        <SummaryCard label="Оплачено" value={formatServicePrice(summary.paid)} />
        <SummaryCard label="Частично оплачено" value={formatServicePrice(summary.partial)} />
        <SummaryCard label="Ожидает оплаты" value={formatServicePrice(summary.pending)} />
      </div>

      <Card>
        <CardHeader className="border-b">
          <CardTitle>Платежи</CardTitle>
          <CardDescription>
            Сводка учитывает суммы записей по статусам. Остаток долга по частичным платежам здесь не рассчитывается.
          </CardDescription>
          <div className="flex flex-col gap-3 pt-3 sm:flex-row">
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Поиск по пациенту"
              aria-label="Поиск платежей по пациенту"
              className="sm:max-w-xs"
            />
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value ?? ALL_STATUSES)}>
              <SelectTrigger className="sm:w-56" aria-label="Фильтр по статусу платежа">
                <SelectValue>{statusFilter === ALL_STATUSES ? "Все статусы" : PAYMENT_STATUS_LABEL[statusFilter as PaymentStatus]}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_STATUSES}>Все статусы</SelectItem>
                {Object.values(PAYMENT_STATUS).map((status) => (
                  <SelectItem key={status} value={status}>
                    {PAYMENT_STATUS_LABEL[status]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          {(paymentsQuery.isLoading || patientsQuery.isLoading) && (
            <p className="text-muted-foreground py-8 text-center text-sm">Загрузка платежей…</p>
          )}
          {isError && (
            <p className="text-destructive py-8 text-center text-sm">
              {errorMessage || "Не удалось загрузить финансовые данные"}
            </p>
          )}
          {!paymentsQuery.isLoading && !patientsQuery.isLoading && !isError && (
            filteredPayments.length === 0 ? (
              <p className="text-muted-foreground py-8 text-center text-sm">
                {payments.length === 0 ? "Платежей пока нет" : "По заданным фильтрам ничего не найдено"}
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-sm">
                  <thead>
                    <tr className="text-muted-foreground border-b text-left">
                      <th className="px-4 py-3 font-medium">Дата</th>
                      <th className="px-4 py-3 font-medium">Пациент</th>
                      <th className="px-4 py-3 text-right font-medium">Сумма</th>
                      <th className="px-4 py-3 text-right font-medium">Статус и действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayments.map((payment) => {
                      const patient = patients.find((item) => item.id === payment.patientId);
                      return (
                        <FinancePaymentRow
                          key={payment.id}
                          payment={payment}
                          patientName={patient ? getFullName(patient) : "Пациент не найден"}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardContent className="pt-4">
        <p className="text-muted-foreground text-sm">{label}</p>
        <p className="mt-1 text-2xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  );
}
