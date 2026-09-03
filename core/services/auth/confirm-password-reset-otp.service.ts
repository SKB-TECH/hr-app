import { apiRequest } from "@/core/lib/api-client";
import type { ConfirmPasswordResetOtpInput } from "@/core/types/auth";

export const confirmPasswordResetOtp = (input: ConfirmPasswordResetOtpInput) =>
  apiRequest<null>("auth/reset-password/confirm-otp", {
    method: "POST",
    body: JSON.stringify(input),
  }).then((response) => response.data);
