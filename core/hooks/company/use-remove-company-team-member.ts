"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeCompanyTeamMember } from "@/core/services/company/remove-company-team-member.service";
import { companyKeys } from "./company-query-keys";
export function useRemoveCompanyTeamMember(id: string) { const client = useQueryClient(); return useMutation({ mutationFn: (teamMemberId: string) => removeCompanyTeamMember(id, teamMemberId), onSuccess: () => { void client.invalidateQueries({ queryKey: companyKeys.mine }); void client.invalidateQueries({ queryKey: companyKeys.detail(id) }); } }); }
