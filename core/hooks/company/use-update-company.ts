"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCompany } from "@/core/services/company/update-company.service";
import type { CompanyInput } from "@/core/types/company";
import { companyKeys } from "./company-query-keys";
export function useUpdateCompany(id: string) { const client = useQueryClient(); return useMutation({ mutationFn: (input: Partial<CompanyInput>) => updateCompany(id, input), onSuccess: (company) => { client.setQueryData(companyKeys.mine, company); client.setQueryData(companyKeys.detail(id), company); } }); }
