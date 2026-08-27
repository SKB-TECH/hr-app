"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCandidateCertification } from "@/core/services/candidate/update-candidate-certification.service";
import type { CandidateCertificationInput } from "@/core/types/candidate-certification";
import { candidateCertificationKeys } from "./candidate-certification-query-keys";

export function useUpdateCandidateCertification() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: CandidateCertificationInput }) =>
      updateCandidateCertification(id, input),
    onSuccess: () => void client.invalidateQueries({ queryKey: candidateCertificationKeys.mine }),
  });
}
