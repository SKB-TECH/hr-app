import { apiRequest } from "@/core/lib/api-client";

function normalizeCity(value: unknown): string {
  if (typeof value === "string") return value;
  const record = value as Record<string, unknown>;
  return String(record.name ?? record.city ?? "");
}

export const getCities = (countryCode: string) =>
  apiRequest<unknown[]>(`localization/countries/${encodeURIComponent(countryCode)}/cities`).then(
    (response) => response.data.map(normalizeCity).filter(Boolean),
  );
