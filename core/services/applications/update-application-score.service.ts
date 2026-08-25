import { apiRequest } from "@/core/lib/api-client";
import type { CompanyApplication } from "@/core/types/application";

export const updateApplicationScore = (applicationId: string, score: number) =>
  apiRequest<CompanyApplication>(`applications/${applicationId}/score`, {
    method: "PATCH",
    body: JSON.stringify({ score }),
  }).then((response) => response.data);
