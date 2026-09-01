"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCandidatePortfolio } from "@/core/services/candidate/create-candidate-portfolio.service";
import { candidatePortfolioKeys } from "./candidate-portfolio-query-keys";

export function useCreateCandidatePortfolio() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: createCandidatePortfolio,
    onSuccess: () => void client.invalidateQueries({ queryKey: candidatePortfolioKeys.mine }),
  });
}
