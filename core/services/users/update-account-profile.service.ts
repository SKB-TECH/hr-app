import { apiRequest } from "@/core/lib/api-client";
import type { AuthUser } from "@/core/types/auth";

export const updateAccountProfile = (input: { fullName?: string; professionId?: string }) =>
  apiRequest<AuthUser>("users/me/profile", { method: "PATCH", body: JSON.stringify(input) }).then((response) => response.data);
