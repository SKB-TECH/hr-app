import { apiRequest } from "@/core/lib/api-client";
import type { Company } from "@/core/types/company";
export const scheduleCompanyDeletion = (id: string, reason: string) => apiRequest<Company>(`companies/${id}/deletion-schedule`, { method: "POST", body: JSON.stringify({ reason }) }).then((response) => response.data);
