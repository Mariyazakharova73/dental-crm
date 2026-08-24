import { Badge } from "@/shared/ui/badge";
import { cn } from "@/shared/utils";
import { PAYMENT_STATUS_LABEL } from "../lib/payment-status-label";
import { PAYMENT_STATUS, type PaymentStatus } from "../types";

const STATUS_VARIANT: Record<
  PaymentStatus,
  "destructive" | "secondary" | "default"
> = {
  [PAYMENT_STATUS.PENDING]: "destructive",
  [PAYMENT_STATUS.PARTIAL]: "secondary",
  [PAYMENT_STATUS.PAID]: "default",
};

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
  className?: string;
}

export function PaymentStatusBadge({ status, className }: PaymentStatusBadgeProps) {
  return (
    <Badge variant={STATUS_VARIANT[status]} className={cn(className)}>
      {PAYMENT_STATUS_LABEL[status]}
    </Badge>
  );
}