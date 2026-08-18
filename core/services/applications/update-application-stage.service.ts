import { apiRequest } from "@/core/lib/api-client";
import type { CompanyApplication } from "@/core/types/application";

export const updateApplicationStage = (applicationId: string, stageId: string, note?: string) =>
  apiRequest<[CompanyApplication, unknown]>(`applications/${applicationId}/stage`, {
    method: "PATCH",
    body: JSON.stringify({ stageId, note }),
  }).then((response) => response.data[0]);
