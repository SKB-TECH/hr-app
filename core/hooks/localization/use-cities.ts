"use client";
import { useQuery } from "@tanstack/react-query";
import { getCities } from "@/core/services/localization/get-cities.service";
import { localizationKeys } from "./localization-query-keys";

export function useCities(countryCode: string | null | undefined) {
  return useQuery({
    queryKey: localizationKeys.cities(countryCode || ""),
    queryFn: () => getCities(countryCode as string),
    enabled: Boolean(countryCode),
    staleTime: Infinity,
  });
}
