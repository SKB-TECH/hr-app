import { ENV } from "@/core/constants/env";

export const getGoogleAuthUrl = () => `${ENV.API_URL}/auth/google`;
