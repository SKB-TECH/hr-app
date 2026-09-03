"use client";
import { useMutation } from "@tanstack/react-query";
import { requestPhoneVerification } from "@/core/services/candidate/request-phone-verification.service";

export function useRequestPhoneVerification() {
  return useMutation({ mutationFn: requestPhoneVerification });
}
