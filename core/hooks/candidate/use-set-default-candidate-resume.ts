"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setDefaultCandidateResume } from "@/core/services/candidate/set-default-candidate-resume.service";
import { candidateResumeKeys } from "./candidate-resume-query-keys";

export function useSetDefaultCandidateResume() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (resumeId: string) => setDefaultCandidateResume(resumeId),
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: candidateResumeKeys.mine });
      void client.invalidateQueries({ queryKey: candidateResumeKeys.default });
    },
  });
}
