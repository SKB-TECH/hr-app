"use client";
import { useQuery } from "@tanstack/react-query";
import { getCandidatePortfolios } from "@/core/services/candidate/get-candidate-portfolios.service";
import { candidatePortfolioKeys } from "./candidate-portfolio-query-keys";

export function useCandidatePortfolios() {
  return useQuery({
    queryKey: candidatePortfolioKeys.mine,
    queryFn: () => getCandidatePortfolios().then((response) => (Array.isArray(response.data) ? response.data : [])),
  });
}
