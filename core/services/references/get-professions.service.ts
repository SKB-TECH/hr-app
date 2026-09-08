import { apiRequest } from "@/core/lib/api-client";
import type { Profession } from "@/core/types/profession";

export const getProfessions = () =>
  apiRequest<Profession[]>("references/professions?limit=500").then((response) => response.data);
