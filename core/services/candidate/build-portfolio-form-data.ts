import type { CandidatePortfolioInput } from "@/core/types/candidate-portfolio";

export function buildPortfolioFormData(input: CandidatePortfolioInput) {
  const body = new FormData();
  body.append("title", input.title.trim());
  body.append("description", input.description.trim());
  if (input.projectUrl?.trim()) body.append("projectUrl", input.projectUrl.trim());
  if (input.thumbnail) body.append("thumbnail", input.thumbnail);
  return body;
}
