"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reactivateCompany } from "@/core/services/company/reactivate-company.service";
import { companyKeys } from "./company-query-keys";
export function useReactivateCompany(id: string) { const client = useQueryClient(); return useMutation({ mutationFn: () => reactivateCompany(id), onSuccess: (company) => client.setQueryData(companyKeys.mine, company) }); }
