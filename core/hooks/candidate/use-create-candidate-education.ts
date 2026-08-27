"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCandidateEducation } from "@/core/services/candidate/create-candidate-education.service";
import { candidateEducationKeys } from "./candidate-education-query-keys";

export function useCreateCandidateEducation() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: createCandidateEducation,
    onSuccess: () => void client.invalidateQueries({ queryKey: candidateEducationKeys.mine }),
  });
}
