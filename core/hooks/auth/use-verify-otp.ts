"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/core/services/auth.service";
import { sessionKey } from "./use-session";
export function useVerifyOtp() { const client = useQueryClient(); return useMutation({ mutationFn: authService.verifyOtp, onSuccess: (user) => client.setQueryData(sessionKey, user) }); }
