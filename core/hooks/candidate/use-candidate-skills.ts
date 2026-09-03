"use client";
import { useQuery } from "@tanstack/react-query";
import { getCandidateSkills } from "@/core/services/candidate/get-candidate-skills.service";
import { candidateSkillKeys } from "./candidate-skill-query-keys";

export function useCandidateSkills() {
  return useQuery({
    queryKey: candidateSkillKeys.mine,
    queryFn: getCandidateSkills,
  });
}
