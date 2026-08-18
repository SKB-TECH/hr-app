"use client";
import { useQuery } from "@tanstack/react-query";
import { getCompanyApplications } from "@/core/services/applications/get-company-applications.service";
import type { ApplicationQuery } from "@/core/types/application";

export const useCompanyApplications = (companyId: string, query: ApplicationQuery = {}) =>
  useQuery({ queryKey: ["applications", "company", companyId, query], queryFn: () => getCompanyApplications(companyId, query), enabled: Boolean(companyId) });
