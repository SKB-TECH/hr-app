"use client";
import { useQuery } from "@tanstack/react-query";
import { getCandidateResumes } from "@/core/services/candidate/get-candidate-resumes.service";
import { candidateResumeKeys } from "./candidate-resume-query-keys";

export function useCandidateResumes() {
  return useQuery({
    queryKey: candidateResumeKeys.mine,
    queryFn: getCandidateResumes,
  });
}
