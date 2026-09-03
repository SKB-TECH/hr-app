"use client";
import { useMutation } from "@tanstack/react-query";
import { confirmPhoneVerification } from "@/core/services/candidate/confirm-phone-verification.service";

export function useConfirmPhoneVerification() {
  return useMutation({ mutationFn: confirmPhoneVerification });
}
