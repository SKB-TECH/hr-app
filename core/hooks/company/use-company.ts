"use client";
import { useQuery } from "@tanstack/react-query";
import { getCompany } from "@/core/services/company/get-company.service";
import { companyKeys } from "./company-query-keys";
export function useCompany(id: string) { return useQuery({ queryKey: companyKeys.detail(id), queryFn: () => getCompany(id), enabled: Boolean(id) }); }
