import { apiRequest } from "@/core/lib/api-client";
import type { CompanyMember } from "@/core/types/company";

export const getMyCompanies = () =>
  apiRequest<CompanyMember[]>("companies/profile/me/companies").then((response) => response.data);
