"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/core/services/auth.service";
import { sessionKey } from "./use-session";
export function useSetupPassword() { const client = useQueryClient(); return useMutation({ mutationFn: authService.setupPassword, onSuccess: (user) => client.setQueryData(sessionKey, user) }); }
