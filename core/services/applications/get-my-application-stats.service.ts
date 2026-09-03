import { apiRequest } from "@/core/lib/api-client";
import { normalizeMyApplicationStats } from "./normalize-my-application-stats";

export const getMyApplicationStats = () =>
  apiRequest<unknown>("applications/my/stats").then((response) => normalizeMyApplicationStats(response.data));
