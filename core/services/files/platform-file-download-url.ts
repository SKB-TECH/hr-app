import { ENV } from "@/core/constants/env";

export const platformFileDownloadUrl = (fileId: string) =>
  `${ENV.API_URL.replace(/\/$/, "")}/files/${encodeURIComponent(fileId)}/download`;
