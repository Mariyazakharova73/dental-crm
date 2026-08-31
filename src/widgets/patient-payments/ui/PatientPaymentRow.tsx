"use client";

import { type Payment } from "@/entities/payment";
import { formatServicePrice } from "@/entities/service";
import { ChangePaymentStatus } from "@/features/change-payment-status";
import { EditPaymentDialog } from "@/features/edit-payment";
import { formatDate } from "@/shared/lib/date/format-date";
import { Button } from "@/shared/ui/button";
import { PencilIcon } from "lucide-react";
import { useState } from "react";

interface PatientPaymentRowProps {
  payment: Payment;
}

export function PatientPaymentRow({ payment }: PatientPaymentRowProps) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <li className="flex flex-col gap-3 border-b py-3 first:pt-0 last:border-b-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 space-y-1">
        <p className="font-medium">{formatDate(payment.date)}</p>
        <p className="text-muted-foreground text-sm">
          {formatServicePrice(payment.amount)}
        </p>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-auto">
        <ChangePaymentStatus payment={payment} />
        <Button
          variant="ghost"
          size="icon"
          className="size-8"
          onClick={() => setEditOpen(true)}
          aria-label="Редактировать платёж"
        >
          <PencilIcon />
        </Button>
      </div>

      <EditPaymentDialog
        payment={payment}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
    </li>
  );
}
