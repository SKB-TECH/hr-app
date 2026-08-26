"use client";
import { useQuery } from "@tanstack/react-query";
import { getMyCompanies } from "@/core/services/company/get-my-companies.service";
import { companyKeys } from "./company-query-keys";

export const useMyCompanies = () => useQuery({ queryKey: companyKeys.mineList, queryFn: getMyCompanies });
