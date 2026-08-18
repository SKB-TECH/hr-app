"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeCompanyMember } from "@/core/services/company/remove-company-member.service";
import { companyKeys } from "./company-query-keys";
export function useRemoveCompanyMember(id: string) { const client = useQueryClient(); return useMutation({ mutationFn: (memberId: string) => removeCompanyMember(id, memberId), onSuccess: () => void client.invalidateQueries({ queryKey: companyKeys.members(id) }) }); }
