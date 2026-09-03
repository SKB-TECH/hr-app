import { apiRequest } from "@/core/lib/api-client";
import type { RegistrationRequest, RequestPasswordResetInput } from "@/core/types/auth";

export const requestPasswordReset = (input: RequestPasswordResetInput) =>
  apiRequest<RegistrationRequest>("auth/reset-password", {
    method: "POST",
    body: JSON.stringify(input),
  }).then((response) => response.data);
