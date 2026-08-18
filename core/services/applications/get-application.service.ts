import { apiRequest } from "@/core/lib/api-client";
import type { CompanyApplication } from "@/core/types/application";

export const getApplication = (applicationId: string) =>
  apiRequest<CompanyApplication>(`applications/${applicationId}`).then((response) => response.data);
