"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCompany } from "@/core/services/company/create-company.service";
import { companyKeys } from "./company-query-keys";
export function useCreateCompany() { const client = useQueryClient(); return useMutation({ mutationFn: createCompany, onSuccess: (company) => { client.setQueryData(companyKeys.mine, company); void client.invalidateQueries({ queryKey: companyKeys.lists() }); } }); }
