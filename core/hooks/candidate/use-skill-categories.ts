"use client";
import { useQuery } from "@tanstack/react-query";
import { getSkillCategories } from "@/core/services/candidate/get-skill-categories.service";
import { candidateSkillKeys } from "./candidate-skill-query-keys";

export function useSkillCategories() {
  return useQuery({
    queryKey: candidateSkillKeys.categories,
    queryFn: getSkillCategories,
    staleTime: Infinity,
  });
}
