import type { MyApplicationQuery } from "@/core/types/application";

export const myApplicationKeys = {
  all: ["applications", "my"] as const,
  list: (query: MyApplicationQuery) => ["applications", "my", "list", query] as const,
  stats: ["applications", "my", "stats"] as const,
};
