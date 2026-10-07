import { getFullName, type Patient } from "@/entities/patient";
import {
  PaymentStatusBadge,
  type Payment,
} from "@/entities/payment";
import { formatServicePrice } from "@/entities/service";
import { ChangePaymentStatus } from "@/features/change-payment-status";
import { EditPaymentDialog } from "@/features/edit-payment";
import { routes } from "@/shared/config/routes";
import { formatDate } from "@/shared/lib/date/format-date";
import { Button } from "@/shared/ui/button";
import { CardContent } from "@/shared/ui/card";
import Link from "next/link";
import { useState } from "react";

type PaymentListProps = {
  payments: Payment[];
  patients: Patient[];
  allPaymentsCount: number;
  isLoading: boolean;
  errorMessage?: string;
};

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

export function PaymentList({
  payments,
  patients,
  allPaymentsCount,
  isLoading,
  errorMessage,
}: PaymentListProps) {
  return (
    <CardContent className="pt-4">
      {isLoading && (
        <p className="text-muted-foreground py-8 text-center text-sm">
          Загрузка платежей…
        </p>
      )}
      {errorMessage && (
        <p className="text-destructive py-8 text-center text-sm">
          {errorMessage}
        </p>
      )}
      {!isLoading && !errorMessage && (payments.length === 0 ? (
        <p className="text-muted-foreground py-8 text-center text-sm">
          {allPaymentsCount === 0
            ? "Платежей пока нет"
            : "По заданным фильтрам ничего не найдено"}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="text-muted-foreground border-b text-left">
                <th className="px-4 py-3 font-medium">Дата</th>
                <th className="px-4 py-3 font-medium">Пациент</th>
                <th className="px-4 py-3 text-right font-medium">Сумма</th>
                <th className="px-4 py-3 text-right font-medium">
                  Статус и действия
                </th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => {
                const patient = patients.find(
                  (item) => item.id === payment.patientId,
                );
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
      ))}
    </CardContent>
  );
}
