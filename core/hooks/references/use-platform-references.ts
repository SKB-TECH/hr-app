"use client";

import { useQuery } from "@tanstack/react-query";
import { getPlatformReferences } from "@/core/services/references/get-platform-references.service";
import type { PlatformReferenceType } from "@/core/types/platform-reference";

export function usePlatformReferences(
  type: PlatformReferenceType,
  search = "",
) {
  return useQuery({
    queryKey: ["platform-references", type, search],
    queryFn: () => getPlatformReferences(type, search),
    staleTime: 10 * 60 * 1000,
  });
}
