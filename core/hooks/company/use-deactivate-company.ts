"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deactivateCompany } from "@/core/services/company/deactivate-company.service";
import { companyKeys } from "./company-query-keys";
export function useDeactivateCompany(id: string) { const client = useQueryClient(); return useMutation({ mutationFn: (reason: string) => deactivateCompany(id, reason), onSuccess: (company) => client.setQueryData(companyKeys.mine, company) }); }
