"use client";
import { useQuery } from "@tanstack/react-query";
import { getMyApplications } from "@/core/services/applications/get-my-applications.service";
import type { MyApplicationQuery } from "@/core/types/application";
import { myApplicationKeys } from "./my-application-query-keys";

export function useMyApplications(query: MyApplicationQuery = {}) {
  return useQuery({
    queryKey: myApplicationKeys.list(query),
    queryFn: () => getMyApplications(query),
  });
}
