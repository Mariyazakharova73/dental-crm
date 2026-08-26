"use client";

import { usePayments } from "@/entities/payment";
import { CreatePaymentDialog } from "@/features/create-payment";
import { SORT_ORDER } from "@/shared/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { PatientPaymentRow } from "./PatientPaymentRow";
import { PatientPaymentsSkeleton } from "./PatientPaymentsSkeleton";
import { PatientPaymentsSummary } from "./PatientPaymentsSummary";

interface PatientPaymentsListProps {
  patientId: number;
  description: string;
}

export function PatientPaymentsList({
  patientId,
  description,
}: PatientPaymentsListProps) {
  const {
    data: payments = [],
    isLoading,
    isError,
    error,
  } = usePayments({
    patientId,
    sort: "date",
    order: SORT_ORDER.DESC,
  });

  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl">Финансы</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <CreatePaymentDialog patientId={patientId} />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 pt-4">
        {isLoading && <PatientPaymentsSkeleton />}

        {isError && (
          <p className="text-destructive text-sm">
            {error.message || "Не удалось загрузить платежи"}
          </p>
        )}

        {!isLoading && !isError && (
          <>
            <PatientPaymentsSummary payments={payments} />

            {payments.length === 0 ? (
              <p className="text-muted-foreground text-sm">Платежей пока нет</p>
            ) : (
              <ul>
                {payments.map((payment) => (
                  <PatientPaymentRow key={payment.id} payment={payment} />
                ))}
              </ul>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
