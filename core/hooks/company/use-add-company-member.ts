"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCompanyMember } from "@/core/services/company/add-company-member.service";
import type { AddCompanyMemberInput } from "@/core/types/company";
import { companyKeys } from "./company-query-keys";
export function useAddCompanyMember(id: string) { const client = useQueryClient(); return useMutation({ mutationFn: (input: AddCompanyMemberInput) => addCompanyMember(id, input), onSuccess: () => { void client.invalidateQueries({ queryKey: companyKeys.members(id) }); void client.invalidateQueries({ queryKey: companyKeys.invitations(id) }); } }); }
