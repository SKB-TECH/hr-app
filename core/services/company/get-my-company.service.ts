import { apiRequest } from "@/core/lib/api-client";
import type { Company } from "@/core/types/company";
import { normalizeCompanyMedia } from "./normalize-company-media";
export const getMyCompany = () => apiRequest<Company>("companies/profile/me").then((response) => normalizeCompanyMedia(response.data));
