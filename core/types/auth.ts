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
  status?: string;
  emailVerified?: boolean;
};

export type LoginInput = { email: string; password: string; rememberMe?: boolean };
export type RegisterInput = {
  fullName: string;
  email: string;
  acceptTerms: boolean;
  role: "CANDIDATE" | "COMPANY_OWNER";
};
export type RegistrationRequest = {
  requestId: string;
  channel: "email";
  destination: string;
};
export type VerifyOtpInput = { requestId: string; otp: string };
export type SetupPasswordInput = { password: string; confirmPassword: string };
