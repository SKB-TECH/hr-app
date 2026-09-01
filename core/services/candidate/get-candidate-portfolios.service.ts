import { apiRequest } from "@/core/lib/api-client";
import type { ApiEnvelope } from "@/core/types/api";
import type { CandidatePortfolio } from "@/core/types/candidate-portfolio";
import { normalizeCandidatePortfolio } from "./normalize-candidate-portfolio";

export const getCandidatePortfolios = () =>
  apiRequest<CandidatePortfolio[]>("candidate/portfolio").then(
    (response) =>
      ({
        ...response,
        data: response.data.map(normalizeCandidatePortfolio),
      }) as ApiEnvelope<CandidatePortfolio[]>,
  );
