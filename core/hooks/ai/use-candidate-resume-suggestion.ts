"use client";
import { useQuery } from "@tanstack/react-query";
import { getCandidateResumeSuggestion } from "@/core/services/ai/get-candidate-resume-suggestion.service";
import { candidateSuggestionKeys } from "./candidate-suggestion-query-keys";

export function useCandidateResumeSuggestion(resumeId: string | null, enabled: boolean) {
  return useQuery({
    queryKey: candidateSuggestionKeys.detail(resumeId || ""),
    queryFn: () => getCandidateResumeSuggestion(resumeId as string),
    enabled: Boolean(resumeId) && enabled,
    retry: false,
  });
}
