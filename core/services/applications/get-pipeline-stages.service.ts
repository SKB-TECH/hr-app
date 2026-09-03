import { apiRequest } from "@/core/lib/api-client";
import type { PipelineStage } from "@/core/types/application";

export const getPipelineStages = (companyId: string) =>
  apiRequest<PipelineStage[]>(`companies/${companyId}/pipeline-stages`).then(async (response) => {
    if (response.data.length > 0) return response.data;
    const defaults = ["À examiner", "Présélection", "Entretien", "Embauché", "Rejeté"];
    const initialized = await apiRequest<PipelineStage[]>(`companies/${companyId}/pipeline-stages`, {
      method: "PUT",
      body: JSON.stringify({ stages: defaults.map((name, index) => ({ name, order: index + 1 })) }),
    });
    return initialized.data;
  });
