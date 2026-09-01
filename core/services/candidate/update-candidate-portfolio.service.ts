import { apiRequest } from "@/core/lib/api-client";
import type { CandidatePortfolio, CandidatePortfolioInput } from "@/core/types/candidate-portfolio";
import { buildPortfolioFormData } from "./build-portfolio-form-data";
import { normalizeCandidatePortfolio } from "./normalize-candidate-portfolio";

export const updateCandidatePortfolio = (id: string, input: CandidatePortfolioInput) =>
  apiRequest<CandidatePortfolio>(`candidate/portfolio/${id}`, {
    method: "PATCH",
    body: buildPortfolioFormData(input),
  }).then((response) => normalizeCandidatePortfolio(response.data));
