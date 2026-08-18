"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCompanyTeamMember } from "@/core/services/company/add-company-team-member.service";
import type { CompanyTeamMemberInput } from "@/core/types/company";
import { companyKeys } from "./company-query-keys";
export function useAddCompanyTeamMember(id: string) { const client = useQueryClient(); return useMutation({ mutationFn: (input: CompanyTeamMemberInput) => addCompanyTeamMember(id, input), onSuccess: () => { void client.invalidateQueries({ queryKey: companyKeys.mine }); void client.invalidateQueries({ queryKey: companyKeys.detail(id) }); } }); }
