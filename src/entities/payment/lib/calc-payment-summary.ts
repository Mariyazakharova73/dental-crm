import { Payment } from "../types";

export function calcPaymentSummary(payments: Payment[]) {
  return payments.reduce(
    (acc, p) => {
      acc.total += p.amount;
      if (p.status === "paid") acc.paid += p.amount;
      if (p.status === "partial") acc.partial += p.amount;
      if (p.status === "pending") acc.pending += p.amount;
      return acc;
    },
    { total: 0, paid: 0, partial: 0, pending: 0 },
  );
}
