"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCompanyBranding, type CompanyBrandingInput } from "@/core/services/company/update-company-branding.service";
import { companyKeys } from "./company-query-keys";
export function useUpdateCompanyBranding(id: string) { const client = useQueryClient(); return useMutation({ mutationFn: (input: CompanyBrandingInput) => updateCompanyBranding(id, input), onSuccess: (company) => { client.setQueryData(companyKeys.mine, company); client.setQueryData(companyKeys.detail(id), company); } }); }
