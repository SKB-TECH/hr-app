"use client";
import { useQuery } from "@tanstack/react-query";
import { getCandidateCertifications } from "@/core/services/candidate/get-candidate-certifications.service";
import { candidateCertificationKeys } from "./candidate-certification-query-keys";

export function useCandidateCertifications() {
  return useQuery({
    queryKey: candidateCertificationKeys.mine,
    queryFn: () => getCandidateCertifications().then((response) => response.data),
  });
}
