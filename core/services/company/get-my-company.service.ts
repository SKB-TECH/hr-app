import { apiRequest } from "@/core/lib/api-client";
import type { Company } from "@/core/types/company";
export const getMyCompany = () => apiRequest<Company>("companies/profile/me").then((response) => response.data);
