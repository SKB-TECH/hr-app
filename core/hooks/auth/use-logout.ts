"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "@/core/services/auth/logout.service";
export function useLogout() { const client = useQueryClient(); return useMutation({ mutationFn: logout, onSuccess: () => client.clear() }); }
