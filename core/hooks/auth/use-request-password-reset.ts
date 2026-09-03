"use client";
import { useMutation } from "@tanstack/react-query";
import { requestPasswordReset } from "@/core/services/auth/request-password-reset.service";
export function useRequestPasswordReset() { return useMutation({ mutationFn: requestPasswordReset }); }
