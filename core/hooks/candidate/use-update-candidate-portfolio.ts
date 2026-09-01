"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCandidatePortfolio } from "@/core/services/candidate/update-candidate-portfolio.service";
import type { CandidatePortfolioInput } from "@/core/types/candidate-portfolio";
import { candidatePortfolioKeys } from "./candidate-portfolio-query-keys";

export function useUpdateCandidatePortfolio() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: CandidatePortfolioInput }) => updateCandidatePortfolio(id, input),
    onSuccess: () => void client.invalidateQueries({ queryKey: candidatePortfolioKeys.mine }),
  });
}
