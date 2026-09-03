import { apiRequest } from "@/core/lib/api-client";
import type { Country } from "@/core/types/localization";

function normalizeCountry(value: unknown): Country {
  if (typeof value === "string") return { code: value, name: value };
  const record = value as Record<string, unknown>;
  const code = String(record.code ?? record.iso2 ?? record.countryCode ?? record.name ?? "");
  const name = String(record.name ?? record.countryName ?? code);
  return { code, name };
}

export const getCountries = () =>
  apiRequest<unknown[]>("localization/countries").then((response) =>
    response.data.map(normalizeCountry),
  );
