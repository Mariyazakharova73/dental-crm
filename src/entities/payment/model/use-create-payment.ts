"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPayment } from "../api/payment-api";
import { CreatePaymentPayload } from "../types";
import { paymentKeys } from './query-keys';

export function useCreatePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePaymentPayload) => createPayment(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.all });
    },
  });
}
