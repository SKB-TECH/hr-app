"use client";
import { useMutation } from "@tanstack/react-query";
import { updateUserPassword } from "@/core/services/users/update-user-password.service";

export function useUpdateUserPassword() {
  return useMutation({ mutationFn: updateUserPassword });
}
