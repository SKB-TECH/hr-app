import { apiRequest } from "@/core/lib/api-client";

export const removeCandidateCertification = (id: string) =>
  apiRequest<{ id: string }>(`candidate/certifications/${id}`, { method: "DELETE" }).then((response) => response.data);
