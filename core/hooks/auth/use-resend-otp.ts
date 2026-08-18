"use client";
import { useMutation } from "@tanstack/react-query";
import { resendOtp } from "@/core/services/auth/resend-otp.service";
export function useResendOtp() { return useMutation({ mutationFn: resendOtp }); }
