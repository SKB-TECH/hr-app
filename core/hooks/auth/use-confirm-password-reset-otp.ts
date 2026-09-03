"use client";
import { useMutation } from "@tanstack/react-query";
import { confirmPasswordResetOtp } from "@/core/services/auth/confirm-password-reset-otp.service";
export function useConfirmPasswordResetOtp() { return useMutation({ mutationFn: confirmPasswordResetOtp }); }
