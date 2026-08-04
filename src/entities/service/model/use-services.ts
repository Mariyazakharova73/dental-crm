"use client";
import { useQuery } from "@tanstack/react-query";
import { getServices } from "../api/service-api";
import { serviceKeys } from "./query-keys";

export function useServices() {
  return useQuery({
    queryKey: serviceKeys.lists(),
    queryFn: getServices,
  });
}
