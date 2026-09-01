"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeCandidatePortfolio } from "@/core/services/candidate/remove-candidate-portfolio.service";
import { candidatePortfolioKeys } from "./candidate-portfolio-query-keys";

export function useRemoveCandidatePortfolio() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => removeCandidatePortfolio(id),
    onSuccess: () => void client.invalidateQueries({ queryKey: candidatePortfolioKeys.mine }),
  });
}
