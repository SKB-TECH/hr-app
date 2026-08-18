import { apiRequest } from "@/core/lib/api-client";
import type { Company } from "@/core/types/company";
export const reactivateCompany = (id: string) => apiRequest<Company>(`companies/${id}/reactivate`, { method: "POST" }).then((response) => response.data);
