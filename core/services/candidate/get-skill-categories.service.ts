import { apiRequest } from "@/core/lib/api-client";
import type { SkillCategory } from "@/core/types/candidate-skill";

export const getSkillCategories = () =>
  apiRequest<SkillCategory[]>("references/skill-categories?limit=200").then((response) => response.data);
