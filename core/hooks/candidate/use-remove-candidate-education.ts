"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeCandidateEducation } from "@/core/services/candidate/remove-candidate-education.service";
import { candidateEducationKeys } from "./candidate-education-query-keys";

export function useRemoveCandidateEducation() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => removeCandidateEducation(id),
    onSuccess: () => void client.invalidateQueries({ queryKey: candidateEducationKeys.mine }),
  });
}
