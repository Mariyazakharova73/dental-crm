"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePayment } from "../api/payment-api";
import { UpdatePaymentPayload } from "../types";
import { paymentKeys } from "./query-keys";

export function useUpdatePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdatePaymentPayload;
    }) => updatePayment(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.all });
    },
  });
}
