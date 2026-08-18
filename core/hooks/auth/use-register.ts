"use client";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/core/services/auth/register.service";
export function useRegister() { return useMutation({ mutationFn: register }); }
