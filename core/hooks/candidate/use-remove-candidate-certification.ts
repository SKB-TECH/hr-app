"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeCandidateCertification } from "@/core/services/candidate/remove-candidate-certification.service";
import { candidateCertificationKeys } from "./candidate-certification-query-keys";

export function useRemoveCandidateCertification() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => removeCandidateCertification(id),
    onSuccess: () => void client.invalidateQueries({ queryKey: candidateCertificationKeys.mine }),
  });
}
