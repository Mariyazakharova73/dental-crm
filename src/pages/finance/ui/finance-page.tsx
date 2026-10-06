import { FinanceOverview } from "@/widgets/finance-overview";

export function FinancePage() {
  return (
    <main className="flex flex-1 flex-col gap-6 p-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Финансы</h1>
        <p className="text-muted-foreground text-sm">
          Платежи клиники и их текущие статусы
        </p>
      </div>
      <FinanceOverview />
    </main>
  );
}
