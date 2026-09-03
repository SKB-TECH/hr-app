import { apiRequest, toQueryString } from "@/core/lib/api-client";
import type {
  PlatformReference,
  PlatformReferenceType,
} from "@/core/types/platform-reference";

export const getPlatformReferences = (
  type: PlatformReferenceType,
  search = "",
) =>
  apiRequest<PlatformReference[]>(
    `references/${type}${toQueryString({ q: search, limit: 100 })}`,
  ).then((response) => response.data);
