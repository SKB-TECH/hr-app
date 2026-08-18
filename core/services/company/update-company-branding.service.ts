import { apiRequest } from "@/core/lib/api-client";
import type { Company } from "@/core/types/company";
export type CompanyBrandingInput = { logoFile?: File; coverFile?: File };
export function updateCompanyBranding(id: string, input: CompanyBrandingInput) { const body = new FormData(); if (input.logoFile) body.append("logoFile", input.logoFile); if (input.coverFile) body.append("coverFile", input.coverFile); return apiRequest<Company>(`companies/${id}/branding`, { method: "PATCH", body }).then((response) => response.data); }
