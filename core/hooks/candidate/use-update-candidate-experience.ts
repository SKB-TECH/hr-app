"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCandidateExperience } from "@/core/services/candidate/update-candidate-experience.service";
import type { CandidateExperienceInput } from "@/core/types/candidate-experience";
import { candidateExperienceKeys } from "./candidate-experience-query-keys";

export function useUpdateCandidateExperience() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: CandidateExperienceInput }) => updateCandidateExperience(id, input),
    onSuccess: () => void client.invalidateQueries({ queryKey: candidateExperienceKeys.mine }),
  });
}
