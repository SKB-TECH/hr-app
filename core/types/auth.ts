export type UserRole =
  | "CANDIDATE"
  | "COMPANY_OWNER"
  | "HR_MANAGER"
  | "RECRUITER"
  | "ADMIN"
  | "SUPER_ADMIN"
  | "MODERATOR";

export type AuthUser = {
  id: string;
  email: string;
  fullName?: string;
  avatar?: string | null;
  role: UserRole;
  profiles: Array<"CANDIDATE" | "COMPANY">;
  activeProfile: "CANDIDATE" | "COMPANY";
  status?: string;
  emailVerified?: boolean;
  professionId?: string | null;
  profession?: { id: string; name: string; code: string; category: string | null } | null;
};

export type LoginInput = {
  email: string;
  password: string;
  rememberMe?: boolean;
  portal?: "CANDIDATE" | "COMPANY";
};
export type RegisterInput = {
  fullName: string;
  email: string;
  acceptTerms: boolean;
  professionId: string;
};
export type RegistrationRequest = {
  requestId: string;
  channel: "email";
  destination: string;
};
export type VerifyOtpInput = { requestId: string; otp: string };
export type SetupPasswordInput = { password: string; confirmPassword: string };

export type RequestPasswordResetInput = { email: string };
export type ConfirmPasswordResetOtpInput = { requestId: string; otp: string };
export type ConfirmPasswordResetOtpResult = { resetToken: string };
export type SetNewPasswordInput = {
  resetToken: string;
  newPassword: string;
  confirmPassword: string;
};
