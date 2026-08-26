import { apiRequest } from "@/core/lib/api-client";
import type { Company } from "@/core/types/company";

export const switchActiveCompany = (companyId: string) =>
  apiRequest<Company>(`companies/profile/me/active-company/${companyId}`, { method: "PATCH" }).then((response) => response.data);
