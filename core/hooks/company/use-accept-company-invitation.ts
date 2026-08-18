"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptCompanyInvitation } from "@/core/services/company/accept-company-invitation.service";
import { companyKeys } from "./company-query-keys";
export function useAcceptCompanyInvitation() { const client = useQueryClient(); return useMutation({ mutationFn: acceptCompanyInvitation, onSuccess: () => void client.invalidateQueries({ queryKey: companyKeys.mine }) }); }
