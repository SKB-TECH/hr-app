"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCandidateExperience } from "@/core/services/candidate/create-candidate-experience.service";
import { candidateExperienceKeys } from "./candidate-experience-query-keys";

export function useCreateCandidateExperience() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: createCandidateExperience,
    onSuccess: () => void client.invalidateQueries({ queryKey: candidateExperienceKeys.mine }),
  });
}
