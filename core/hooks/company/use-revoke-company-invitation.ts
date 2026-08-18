"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { revokeCompanyInvitation } from "@/core/services/company/revoke-company-invitation.service";
import { companyKeys } from "./company-query-keys";
export function useRevokeCompanyInvitation(id: string) { const client = useQueryClient(); return useMutation({ mutationFn: (invitationId: string) => revokeCompanyInvitation(id, invitationId), onSuccess: () => void client.invalidateQueries({ queryKey: companyKeys.invitations(id) }) }); }
