import { apiRequest } from "@/core/lib/api-client";
import type { Company, CompanyInput } from "@/core/types/company";
export const createCompany = (input: CompanyInput) => apiRequest<Company>("companies", { method: "POST", body: JSON.stringify(input) }).then((response) => response.data);
