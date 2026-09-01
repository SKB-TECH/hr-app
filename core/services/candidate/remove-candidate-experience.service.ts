import { apiRequest } from "@/core/lib/api-client";

export const removeCandidateExperience = (id: string) =>
  apiRequest<{ id: string }>(`candidate/experience/${id}`, {
    method: "DELETE",
  }).then((response) => response.data);
