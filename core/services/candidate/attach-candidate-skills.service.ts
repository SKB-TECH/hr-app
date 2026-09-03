import { apiRequest } from "@/core/lib/api-client";
import type { AttachCandidateSkillsInput, CandidateSkill } from "@/core/types/candidate-skill";

export const attachCandidateSkills = (input: AttachCandidateSkillsInput) =>
  apiRequest<CandidateSkill[]>("candidate/skills", {
    method: "POST",
    body: JSON.stringify(input),
  }).then((response) => response.data);
