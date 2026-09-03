import { apiRequest } from "@/core/lib/api-client";
import type { AuthUser } from "@/core/types/auth";
import type { UpdateEmailInput } from "@/core/types/user";

export const updateUserEmail = (input: UpdateEmailInput) =>
  apiRequest<AuthUser>("users/me/email", {
    method: "PATCH",
    body: JSON.stringify(input),
  }).then((response) => response.data);
