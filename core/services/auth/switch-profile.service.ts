import { apiRequest } from "@/core/lib/api-client";
import type { AuthUser } from "@/core/types/auth";

export type AccountProfile = "CANDIDATE" | "COMPANY";

export const enableProfile = (profile: AccountProfile) =>
  apiRequest<AuthUser>("auth/profiles", { method: "POST", body: JSON.stringify({ profile }) }).then((response) => response.data);

export const switchProfile = (profile: AccountProfile) =>
  apiRequest<AuthUser>("auth/active-profile", { method: "PATCH", body: JSON.stringify({ profile }) }).then((response) => response.data);
