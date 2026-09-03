"use client";
import { useQuery } from "@tanstack/react-query";
import { getCountries } from "@/core/services/localization/get-countries.service";
import { localizationKeys } from "./localization-query-keys";

export function useCountries() {
  return useQuery({
    queryKey: localizationKeys.countries,
    queryFn: getCountries,
    staleTime: Infinity,
  });
}
