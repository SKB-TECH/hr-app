"use client";
import { useMutation } from "@tanstack/react-query";
import { resendPasswordResetOtp } from "@/core/services/auth/resend-password-reset-otp.service";
export function useResendPasswordResetOtp() { return useMutation({ mutationFn: resendPasswordResetOtp }); }
