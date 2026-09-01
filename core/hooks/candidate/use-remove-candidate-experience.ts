"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeCandidateExperience } from "@/core/services/candidate/remove-candidate-experience.service";
import { candidateExperienceKeys } from "./candidate-experience-query-keys";

export function useRemoveCandidateExperience() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => removeCandidateExperience(id),
    onSuccess: () => void client.invalidateQueries({ queryKey: candidateExperienceKeys.mine }),
  });
}
