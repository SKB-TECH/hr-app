"use client";
import { useQuery } from "@tanstack/react-query";
import { getCandidateEducations } from "@/core/services/candidate/get-candidate-educations.service";
import { candidateEducationKeys } from "./candidate-education-query-keys";

export function useCandidateEducations() {
  return useQuery({
    queryKey: candidateEducationKeys.mine,
    queryFn: () => getCandidateEducations().then((response) => (Array.isArray(response.data) ? response.data : [])),
  });
}
