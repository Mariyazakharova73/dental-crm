"use client";

import { useQuery } from "@tanstack/react-query";
import { getPayments } from "../api/payment-api";
import { paymentKeys, PaymentListParams } from "./query-keys";

export function usePayments(params?: PaymentListParams) {
  return useQuery({
    queryKey: paymentKeys.lists(params),
    queryFn: () => getPayments(params),
  });
}
