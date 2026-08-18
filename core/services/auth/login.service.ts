import { apiRequest } from "@/core/lib/api-client";
import type { AuthUser, LoginInput } from "@/core/types/auth";

export const login = (input: LoginInput) =>
  apiRequest<{ user: AuthUser }>("auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  }).then((response) => response.data.user);
