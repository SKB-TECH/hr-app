import { apiRequest } from "@/core/lib/api-client";
import type { AuthUser } from "@/core/types/auth";

export const getSession = () =>
  apiRequest<AuthUser>("auth/me").then((response) => response.data);
