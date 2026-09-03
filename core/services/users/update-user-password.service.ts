import { apiRequest } from "@/core/lib/api-client";
import type { UpdatePasswordInput } from "@/core/types/user";

export const updateUserPassword = (input: UpdatePasswordInput) =>
  apiRequest<null>("users/me/password", {
    method: "PATCH",
    body: JSON.stringify(input),
  }).then((response) => response.data);
