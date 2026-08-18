import { apiRequest } from "@/core/lib/api-client";
import type { Company } from "@/core/types/company";
export const getCompany = (id: string) => apiRequest<Company>(`companies/${id}`).then((response) => response.data);
