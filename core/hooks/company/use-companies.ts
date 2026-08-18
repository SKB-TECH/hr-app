"use client";
import { useQuery } from "@tanstack/react-query";
import { getCompanies } from "@/core/services/company/get-companies.service";
import type { CompanyQuery } from "@/core/types/company";
import { companyKeys } from "./company-query-keys";
export function useCompanies(query: CompanyQuery = {}) { return useQuery({ queryKey: companyKeys.list(query), queryFn: () => getCompanies(query) }); }
