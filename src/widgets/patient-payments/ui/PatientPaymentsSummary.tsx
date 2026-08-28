import { calcPaymentSummary, type Payment } from "@/entities/payment";
import { formatServicePrice } from "@/entities/service";

interface PatientPaymentsSummaryProps {
  payments: Payment[];
}

export function PatientPaymentsSummary({
  payments,
}: PatientPaymentsSummaryProps) {
  const summary = calcPaymentSummary(payments);

  const stats = [
    { label: "Всего", value: summary.total },
    { label: "Оплачено", value: summary.paid },
    { label: "Частично", value: summary.partial },
    { label: "К оплате", value: summary.pending },
  ];

  return (
    <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label}>
          <dt className="text-muted-foreground text-xs">{stat.label}</dt>
          <dd className="text-xl font-semibold">
            {formatServicePrice(stat.value)}
          </dd>
        </div>
      ))}
    </dl>
  );
}
