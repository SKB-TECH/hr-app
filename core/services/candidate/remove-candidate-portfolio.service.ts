import { apiRequest } from "@/core/lib/api-client";

export const removeCandidatePortfolio = (id: string) =>
  apiRequest<{ id: string }>(`candidate/portfolio/${id}`, { method: "DELETE" }).then((response) => response.data);
