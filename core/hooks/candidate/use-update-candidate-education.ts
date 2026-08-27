"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCandidateEducation } from "@/core/services/candidate/update-candidate-education.service";
import type { CandidateEducationInput } from "@/core/types/candidate-education";
import { candidateEducationKeys } from "./candidate-education-query-keys";

export function useUpdateCandidateEducation() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: CandidateEducationInput }) => updateCandidateEducation(id, input),
    onSuccess: () => void client.invalidateQueries({ queryKey: candidateEducationKeys.mine }),
  });
}
