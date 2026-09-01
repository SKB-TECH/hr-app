import { apiRequest } from "@/core/lib/api-client";
import type {
  CandidatePortfolio,
  CandidatePortfolioInput,
} from "@/core/types/candidate-portfolio";
import { buildPortfolioFormData } from "./build-portfolio-form-data";
import { normalizeCandidatePortfolio } from "./normalize-candidate-portfolio";

export const createCandidatePortfolio = (input: CandidatePortfolioInput) =>
  apiRequest<CandidatePortfolio>("candidate/portfolio", {
    method: "POST",
    body: buildPortfolioFormData(input),
  }).then((response) => normalizeCandidatePortfolio(response.data));
