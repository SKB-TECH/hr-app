import { apiRequest } from "@/core/lib/api-client";

export const removeCandidateEducation = (id: string) =>
  apiRequest<{ id: string }>(`candidates/me/educations/${id}`, { method: "DELETE" }).then((response) => response.data);
