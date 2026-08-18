import { apiRequest } from "@/core/lib/api-client";
import type { AuthUser, VerifyOtpInput } from "@/core/types/auth";

export const verifyOtp = (input: VerifyOtpInput) =>
  apiRequest<{ user: AuthUser }>("auth/registration/verify-otp", {
    method: "POST",
    body: JSON.stringify(input),
  }).then((response) => response.data.user);
