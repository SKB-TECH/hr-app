"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeCandidateResume } from "@/core/services/candidate/remove-candidate-resume.service";
import { candidateResumeKeys } from "./candidate-resume-query-keys";

export function useRemoveCandidateResume() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => removeCandidateResume(id),
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: candidateResumeKeys.mine });
      void client.invalidateQueries({ queryKey: candidateResumeKeys.default });
    },
  });
}
