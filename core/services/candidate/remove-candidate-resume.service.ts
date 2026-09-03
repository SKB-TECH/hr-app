import { apiRequest } from "@/core/lib/api-client";

export const removeCandidateResume = (id: string) =>
  apiRequest<{ id: string }>(`resumes/${id}`, {
    method: "DELETE",
  }).then((response) => response.data);
