import { apiRequest } from "@/core/lib/api-client";
import type { CompanyJobStats } from "@/core/types/job";

export const getCompanyJobStats = () =>
  apiRequest<CompanyJobStats>("jobs/company/me/stats")
    .then((response) => response.data);
