"use client";
import { useQuery } from "@tanstack/react-query";
import { getCompanyMembers } from "@/core/services/company/get-company-members.service";
import { companyKeys } from "./company-query-keys";
export function useCompanyMembers(id?: string) { return useQuery({ queryKey: companyKeys.members(id || ""), queryFn: () => getCompanyMembers(id!), enabled: Boolean(id) }); }
