import { formatServicePrice } from "@/entities/service";
import { SummaryCard } from "./summary-card";

type SummaryCardsProps = {
  total: number;
  paid: number;
  partial: number;
  pending: number;
};

export function SummaryCards({
  total,
  paid,
  partial,
  pending,
}: SummaryCardsProps) {
  const cards = [
    { label: "Всего платежей", value: total },
    { label: "Оплачено", value: paid },
    { label: "Частично оплачено", value: partial },
    { label: "Ожидает оплаты", value: pending },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <SummaryCard
          key={card.label}
          label={card.label}
          value={formatServicePrice(card.value)}
        />
      ))}
    </div>
  );
}
