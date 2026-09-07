import { apiRequest } from "@/core/lib/api-client";
import type { AttachCandidateSkillsInput, CandidateSkill } from "@/core/types/candidate-skill";
import { normalizeCandidateSkill } from "./get-candidate-skills.service";

export const attachCandidateSkills = (input: AttachCandidateSkillsInput) =>
  apiRequest<Parameters<typeof normalizeCandidateSkill>[0][]>("candidate/skills", {
    method: "PUT",
    body: JSON.stringify(input),
  }).then((response): CandidateSkill[] => response.data.map(normalizeCandidateSkill));
