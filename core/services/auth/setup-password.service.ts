import { apiRequest } from "@/core/lib/api-client";
import type { AuthUser, SetupPasswordInput } from "@/core/types/auth";

export const setupPassword = (input: SetupPasswordInput) =>
  apiRequest<{ user: AuthUser }>("auth/registration/setup-password", {
    method: "POST",
    body: JSON.stringify(input),
  }).then((response) => response.data.user);
