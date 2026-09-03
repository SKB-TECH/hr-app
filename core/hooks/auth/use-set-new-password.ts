"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setNewPassword } from "@/core/services/auth/set-new-password.service";
import { sessionKey } from "./use-session";
export function useSetNewPassword() { const client = useQueryClient(); return useMutation({ mutationFn: setNewPassword, onSuccess: (user) => client.setQueryData(sessionKey, user) }); }
