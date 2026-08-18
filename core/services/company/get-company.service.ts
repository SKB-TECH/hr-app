import { apiRequest } from "@/core/lib/api-client";
import type { Company } from "@/core/types/company";
import { normalizeCompanyMedia } from "./normalize-company-media";
export const getCompany = (id: string) => apiRequest<Company>(`companies/${id}`).then((response) => normalizeCompanyMedia(response.data));
