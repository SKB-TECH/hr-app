import { apiRequest } from "@/core/lib/api-client";
import type { GlobalSearchResults } from "@/core/types/global-search";

export const globalSearch = (query: string) =>
  apiRequest<GlobalSearchResults>(`search?q=${encodeURIComponent(query)}&limit=6`).then((response) => response.data);
