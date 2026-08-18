import { apiRequest } from "@/core/lib/api-client";
import { ENV } from "@/core/constants/env";
import type { AuthUser, LoginInput, RegisterInput, RegistrationRequest, SetupPasswordInput, VerifyOtpInput } from "@/core/types/auth";

export const authService = {
  login: (input: LoginInput) => apiRequest<{ user: AuthUser }>("auth/login", { method: "POST", body: JSON.stringify(input) }).then((r) => r.data.user),
  register: (input: RegisterInput) => apiRequest<RegistrationRequest>("auth/registration/register", { method: "POST", body: JSON.stringify(input) }).then((r) => r.data),
  verifyOtp: (input: VerifyOtpInput) => apiRequest<{ user: AuthUser }>("auth/registration/verify-otp", { method: "POST", body: JSON.stringify(input) }).then((r) => r.data.user),
  resendOtp: (requestId: string) => apiRequest<RegistrationRequest>("auth/registration/resend-otp", { method: "POST", body: JSON.stringify({ requestId }) }).then((r) => r.data),
  setupPassword: (input: SetupPasswordInput) => apiRequest<{ user: AuthUser }>("auth/registration/setup-password", { method: "POST", body: JSON.stringify(input) }).then((r) => r.data.user),
  me: () => apiRequest<AuthUser>("auth/me").then((r) => r.data),
  logout: () => apiRequest<null>("auth/logout", { method: "POST" }).then(() => undefined),
  googleUrl: () => `${ENV.API_URL}/auth/google`,
};
