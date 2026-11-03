import { ENV } from "@/core/constants/env";

export type OAuthProvider = "google" | "linkedin";

export function getOAuthAuthUrl(
  provider: OAuthProvider,
  options: {
    portal: "CANDIDATE" | "COMPANY";
    locale: string;
    returnTo?: string;
  },
) {
  const query = new URLSearchParams({
    portal: options.portal,
    locale: options.locale,
  });
  if (options.returnTo) query.set("returnTo", options.returnTo);
  return `${ENV.API_URL}/auth/${provider}?${query.toString()}`;
}

export const getGoogleAuthUrl = (portal: "CANDIDATE" | "COMPANY") =>
  getOAuthAuthUrl("google", { portal, locale: "en" });
