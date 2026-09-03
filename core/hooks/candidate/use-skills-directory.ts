"use client";
import { useQuery } from "@tanstack/react-query";
import { getSkillsDirectory } from "@/core/services/candidate/get-skills-directory.service";
import { candidateSkillKeys } from "./candidate-skill-query-keys";

export function useSkillsDirectory(search: string) {
  return useQuery({
    queryKey: candidateSkillKeys.directory(search),
    queryFn: () => getSkillsDirectory(search),
    staleTime: 5 * 60 * 1000,
  });
}
