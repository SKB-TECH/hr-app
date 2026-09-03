"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCandidateResumeSuggestion } from "@/core/services/ai/delete-candidate-resume-suggestion.service";
import { candidateSuggestionKeys } from "./candidate-suggestion-query-keys";

export function useDeleteCandidateResumeSuggestion() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (resumeId: string) => deleteCandidateResumeSuggestion(resumeId),
    onSuccess: (_data, resumeId) => {
      client.removeQueries({ queryKey: candidateSuggestionKeys.detail(resumeId) });
    },
  });
}
