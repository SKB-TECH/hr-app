"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/core/services/auth.service";
export function useLogout() { const client = useQueryClient(); return useMutation({ mutationFn: authService.logout, onSuccess: () => client.clear() }); }
