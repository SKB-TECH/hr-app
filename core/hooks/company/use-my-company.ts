"use client";
import { useQuery } from "@tanstack/react-query";
import { getMyCompany } from "@/core/services/company/get-my-company.service";
import { companyKeys } from "./company-query-keys";
export function useMyCompany() { return useQuery({ queryKey: companyKeys.mine, queryFn: getMyCompany, retry: false }); }
