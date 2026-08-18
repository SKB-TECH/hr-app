import { apiRequest } from "@/core/lib/api-client";
import type { RegistrationRequest } from "@/core/types/auth";

export const resendOtp = (requestId: string) =>
  apiRequest<RegistrationRequest>("auth/registration/resend-otp", {
    method: "POST",
    body: JSON.stringify({ requestId }),
  }).then((response) => response.data);
