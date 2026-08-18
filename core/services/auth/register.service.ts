import { apiRequest } from "@/core/lib/api-client";
import type { RegisterInput, RegistrationRequest } from "@/core/types/auth";

export const register = (input: RegisterInput) =>
  apiRequest<RegistrationRequest>("auth/registration/register", {
    method: "POST",
    body: JSON.stringify(input),
  }).then((response) => response.data);
