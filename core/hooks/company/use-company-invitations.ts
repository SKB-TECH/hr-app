"use client";
import { useQuery } from "@tanstack/react-query";
import { getCompanyInvitations } from "@/core/services/company/get-company-invitations.service";
import { companyKeys } from "./company-query-keys";
export function useCompanyInvitations(id?: string) { return useQuery({ queryKey: companyKeys.invitations(id || ""), queryFn: () => getCompanyInvitations(id!), enabled: Boolean(id) }); }
