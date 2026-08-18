import { apiRequest } from "@/core/lib/api-client";

export const logout = () =>
  apiRequest<null>("auth/logout", { method: "POST" }).then(() => undefined);
