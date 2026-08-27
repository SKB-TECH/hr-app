"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCandidateCertification } from "@/core/services/candidate/create-candidate-certification.service";
import { candidateCertificationKeys } from "./candidate-certification-query-keys";

export function useCreateCandidateCertification() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: createCandidateCertification,
    onSuccess: () => void client.invalidateQueries({ queryKey: candidateCertificationKeys.mine }),
  });
}
