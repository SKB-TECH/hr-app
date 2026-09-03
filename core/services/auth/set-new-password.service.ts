import { apiRequest } from "@/core/lib/api-client";
import type { AuthUser, SetNewPasswordInput } from "@/core/types/auth";

export const setNewPassword = (input: SetNewPasswordInput) =>
  apiRequest<{ user: AuthUser }>("auth/reset-password/set-new-password", {
    method: "PATCH",
    headers: { "x-reset-token": input.resetToken },
    body: JSON.stringify({
      newPassword: input.newPassword,
      confirmPassword: input.confirmPassword,
    }),
  }).then((response) => response.data.user);
