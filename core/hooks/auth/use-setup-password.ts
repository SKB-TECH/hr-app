"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setupPassword } from "@/core/services/auth/setup-password.service";
import { sessionKey } from "./use-session";
export function useSetupPassword() { const client = useQueryClient(); return useMutation({ mutationFn: setupPassword, onSuccess: (user) => client.setQueryData(sessionKey, user) }); }
