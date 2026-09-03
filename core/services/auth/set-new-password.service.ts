import { apiRequest } from "@/core/lib/api-client";
import type { AuthUser, SetNewPasswordInput } from "@/core/types/auth";

export const setNewPassword = (input: SetNewPasswordInput) =>
  apiRequest<{ user: AuthUser }>("auth/reset-password/set-new-password", {
    method: "PATCH",
    body: JSON.stringify(input),
  }).then((response) => response.data.user);
