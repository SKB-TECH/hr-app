"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { extractCandidateResume } from "@/core/services/ai/extract-candidate-resume.service";
import { candidateSuggestionKeys } from "./candidate-suggestion-query-keys";

export function useExtractCandidateResume() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (resumeId: string) => extractCandidateResume(resumeId),
    onSuccess: (suggestion, resumeId) => {
      client.setQueryData(candidateSuggestionKeys.detail(resumeId), suggestion);
    },
  });
}
