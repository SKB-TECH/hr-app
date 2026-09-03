"use client";
import { useQuery } from "@tanstack/react-query";
import { getDefaultCandidateResume } from "@/core/services/candidate/get-default-candidate-resume.service";
import { candidateResumeKeys } from "./candidate-resume-query-keys";

export function useDefaultCandidateResume() {
  return useQuery({
    queryKey: candidateResumeKeys.default,
    queryFn: getDefaultCandidateResume,
    retry: false,
  });
}
