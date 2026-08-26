import { ENV } from "@/core/constants/env";

export const getGoogleAuthUrl = (portal: "CANDIDATE" | "COMPANY") =>
  `${ENV.API_URL}/auth/google?portal=${portal}`;
