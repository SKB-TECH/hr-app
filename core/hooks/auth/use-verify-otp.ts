"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verifyOtp } from "@/core/services/auth/verify-otp.service";
import { sessionKey } from "./use-session";
export function useVerifyOtp() { const client = useQueryClient(); return useMutation({ mutationFn: verifyOtp, onSuccess: (user) => client.setQueryData(sessionKey, user) }); }
