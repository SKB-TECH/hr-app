import { apiRequest } from "@/core/lib/api-client";
import type { PipelineStage } from "@/core/types/application";

export const getPipelineStages = (companyId: string) =>
  apiRequest<PipelineStage[]>(`companies/${companyId}/pipeline-stages`).then((response) => response.data);
