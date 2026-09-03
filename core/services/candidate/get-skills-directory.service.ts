import { apiRequest, toQueryString } from "@/core/lib/api-client";
import type { SkillDirectoryEntry } from "@/core/types/candidate-skill";

export const getSkillsDirectory = (search?: string) =>
  apiRequest<SkillDirectoryEntry[]>(`skills${toQueryString({ q: search, limit: 100 })}`).then(
    (response) => response.data,
  );
