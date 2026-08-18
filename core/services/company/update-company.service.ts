import { apiRequest } from "@/core/lib/api-client";
import type { Company, CompanyInput } from "@/core/types/company";
export const updateCompany = (id: string, input: Partial<CompanyInput>) => apiRequest<Company>(`companies/${id}`, { method: "PATCH", body: JSON.stringify(input) }).then((response) => response.data);
