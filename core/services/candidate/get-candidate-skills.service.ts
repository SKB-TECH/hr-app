import { apiRequest } from "@/core/lib/api-client";
import type { CandidateSkill } from "@/core/types/candidate-skill";

export const getCandidateSkills = () =>
  apiRequest<CandidateSkill[]>("candidate/skills").then((response) => response.data);
