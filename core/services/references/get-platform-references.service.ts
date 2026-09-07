import { apiRequest, toQueryString } from "@/core/lib/api-client";
import type {
  PlatformReference,
  PlatformReferenceType,
} from "@/core/types/platform-reference";

export const getPlatformReferences = (
  type: PlatformReferenceType,
  search = "",
) => {
  const endpoint = type === "country" ? "countries" : type === "language" ? "languages" : type === "skill_category" ? "skill-categories" : type;
  return apiRequest<PlatformReference[]>(
    `references/${endpoint}${toQueryString({ q: search, limit: 100 })}`,
  ).then((response) => response.data);
}
