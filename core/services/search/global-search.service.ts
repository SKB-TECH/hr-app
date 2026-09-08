import { apiRequest } from "@/core/lib/api-client";
import type { GlobalSearchResults } from "@/core/types/global-search";

export type GlobalSearchType = "all" | "jobs" | "companies" | "people";

export const globalSearch = (
  query: string,
  filters: { type?: GlobalSearchType; location?: string } = {},
) => {
  const params = new URLSearchParams({ q: query, limit: "8" });
  if (filters.type && filters.type !== "all") params.set("type", filters.type);
  if (filters.location?.trim()) params.set("location", filters.location.trim());
  return apiRequest<GlobalSearchResults>(`search?${params}`).then((response) => response.data);
};
