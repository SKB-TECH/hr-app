import { apiRequest } from "@/core/lib/api-client";
import type { Interview } from "@/core/types/application";

export const getCompanyInterviews = (companyId: string) =>
  apiRequest<Interview[]>(`interviews/company/${companyId}`).then((response) => response.data);
