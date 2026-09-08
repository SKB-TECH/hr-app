"use client";
import { useQuery } from "@tanstack/react-query";
import { getProfessions } from "@/core/services/references/get-professions.service";

export function useProfessions() {
  return useQuery({ queryKey: ["references", "professions"], queryFn: getProfessions, staleTime: Infinity });
}
