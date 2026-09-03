"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCandidateResume } from "@/core/services/candidate/create-candidate-resume.service";
import { candidateResumeKeys } from "./candidate-resume-query-keys";

export function useCreateCandidateResume() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: createCandidateResume,
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: candidateResumeKeys.mine });
      void client.invalidateQueries({ queryKey: candidateResumeKeys.default });
    },
  });
}
