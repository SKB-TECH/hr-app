import { apiRequest } from "@/core/lib/api-client";
import type { ApplicationStageHistory } from "@/core/types/application";

export const getApplicationHistory = (applicationId: string) =>
  apiRequest<ApplicationStageHistory[]>(`applications/${applicationId}/history`)
    .then((response) => response.data);
