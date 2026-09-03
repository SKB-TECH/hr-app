"use client";
import { useQuery } from "@tanstack/react-query";
import { getMyApplicationStats } from "@/core/services/applications/get-my-application-stats.service";
import { myApplicationKeys } from "./my-application-query-keys";

export function useMyApplicationStats() {
  return useQuery({
    queryKey: myApplicationKeys.stats,
    queryFn: getMyApplicationStats,
  });
}
