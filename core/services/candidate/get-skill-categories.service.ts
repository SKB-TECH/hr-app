import { apiRequest } from "@/core/lib/api-client";
import type { SkillCategory } from "@/core/types/candidate-skill";

export const getSkillCategories = () =>
  apiRequest<SkillCategory[]>("candidate/skills/categories").then((response) => response.data);
