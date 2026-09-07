import { apiRequest } from "@/core/lib/api-client";
import type { CandidateSkill } from "@/core/types/candidate-skill";

type CandidateSkillApiResponse = {
  id: string;
  candidateId?: string;
  level?: string | null;
  yearsExperience?: number | null;
  skill?: {
    id: string;
    name: string;
    category?: { id: string; name: string } | null;
  } | null;
  skillId?: string;
  name?: string;
  categoryId?: string | null;
};

export const normalizeCandidateSkill = (item: CandidateSkillApiResponse): CandidateSkill => ({
  id: item.id,
  skillId: item.skill?.id ?? item.skillId ?? "",
  name: item.skill?.name ?? item.name ?? "Compétence",
  categoryId: item.skill?.category?.id ?? item.categoryId ?? null,
});

export const getCandidateSkills = () =>
  apiRequest<CandidateSkillApiResponse[]>("candidate/skills").then((response) =>
    response.data.map(normalizeCandidateSkill).filter((skill) => skill.skillId),
  );
