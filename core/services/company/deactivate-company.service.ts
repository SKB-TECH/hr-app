import { apiRequest } from "@/core/lib/api-client";
import type { Company } from "@/core/types/company";
export const deactivateCompany = (id: string, reason: string) => apiRequest<Company>(`companies/${id}/deactivate`, { method: "POST", body: JSON.stringify({ reason }) }).then((response) => response.data);
