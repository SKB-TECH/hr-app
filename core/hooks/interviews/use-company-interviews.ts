"use client";
import { useQuery } from "@tanstack/react-query";
import { getCompanyInterviews } from "@/core/services/interviews/get-company-interviews.service";

export const useCompanyInterviews = (companyId: string) =>
  useQuery({ queryKey: ["interviews", "company", companyId], queryFn: () => getCompanyInterviews(companyId), enabled: Boolean(companyId) });
