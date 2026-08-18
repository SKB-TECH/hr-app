import type { CompanyQuery } from "@/core/types/company";
export const companyKeys = {
  all: ["companies"] as const,
  lists: () => [...companyKeys.all, "list"] as const,
  list: (query: CompanyQuery) => [...companyKeys.lists(), query] as const,
  detail: (id: string) => [...companyKeys.all, "detail", id] as const,
  mine: ["companies", "mine"] as const,
  members: (id: string) => [...companyKeys.detail(id), "members"] as const,
  invitations: (id: string) => [...companyKeys.detail(id), "invitations"] as const,
};
