"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCompanyMember, type UpdateCompanyMemberInput } from "@/core/services/company/update-company-member.service";
import { companyKeys } from "./company-query-keys";
export function useUpdateCompanyMember(id: string) { const client = useQueryClient(); return useMutation({ mutationFn: ({ memberId, input }: { memberId: string; input: UpdateCompanyMemberInput }) => updateCompanyMember(id, memberId, input), onSuccess: () => void client.invalidateQueries({ queryKey: companyKeys.members(id) }) }); }
