import { apiRequest, toQueryString } from "@/core/lib/api-client";
import type { SkillDirectoryEntry } from "@/core/types/candidate-skill";

export const getSkillsDirectory = (search?: string) =>
  apiRequest<SkillDirectoryEntry[]>(`candidate/skills/directory${toQueryString({ search })}`).then(
    (response) => response.data,
  );
