import { apiRequest } from "@/core/lib/api-client";
import type { RegistrationRequest } from "@/core/types/auth";

export const resendPasswordResetOtp = (requestId: string) =>
  apiRequest<RegistrationRequest>("auth/reset-password/resend-otp", {
    method: "POST",
    body: JSON.stringify({ requestId }),
  }).then((response) => response.data);
