import { apiRequest } from "@/core/lib/api-client";

export const removeCandidateSkill = (skillId: string) =>
  apiRequest<{ id: string }>(`candidate/skills/${skillId}`, {
    method: "DELETE",
  }).then((response) => response.data);
