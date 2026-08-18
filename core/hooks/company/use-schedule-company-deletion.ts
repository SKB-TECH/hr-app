"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { scheduleCompanyDeletion } from "@/core/services/company/schedule-company-deletion.service";
import { companyKeys } from "./company-query-keys";
export function useScheduleCompanyDeletion(id: string) { const client = useQueryClient(); return useMutation({ mutationFn: (reason: string) => scheduleCompanyDeletion(id, reason), onSuccess: (company) => client.setQueryData(companyKeys.mine, company) }); }
