"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCompanyTeamMember } from "@/core/services/company/update-company-team-member.service";
import type { CompanyTeamMemberInput } from "@/core/types/company";
import { companyKeys } from "./company-query-keys";
export function useUpdateCompanyTeamMember(id: string) { const client = useQueryClient(); return useMutation({ mutationFn: ({ teamMemberId, input }: { teamMemberId: string; input: Partial<CompanyTeamMemberInput> }) => updateCompanyTeamMember(id, teamMemberId, input), onSuccess: () => { void client.invalidateQueries({ queryKey: companyKeys.mine }); void client.invalidateQueries({ queryKey: companyKeys.detail(id) }); } }); }
