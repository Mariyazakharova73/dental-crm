import {
  PAYMENT_STATUS,
  PAYMENT_STATUS_LABEL,
  type PaymentStatus,
} from "@/entities/payment";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

const ALL_STATUSES = "all";

type PaymentFiltersProps = {
  search: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
};

export function PaymentFilters({
  search,
  statusFilter,
  onSearchChange,
  onStatusChange,
}: PaymentFiltersProps) {
  return (
    <div className="flex flex-col gap-3 pt-3 sm:flex-row">
      <Input
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Поиск по пациенту"
        aria-label="Поиск платежей по пациенту"
        className="sm:max-w-xs"
      />
      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger
          className="sm:w-56"
          aria-label="Фильтр по статусу платежа"
        >
          <SelectValue>
            {statusFilter === ALL_STATUSES
              ? "Все статусы"
              : PAYMENT_STATUS_LABEL[statusFilter as PaymentStatus]}
          </SelectValue>
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
  );
}
