import { apiRequest } from "@/core/lib/api-client";
import type { StoredFile } from "@/core/types/stored-file";

export function uploadPlatformFile(file: File) {
  const body = new FormData();
  body.append("file", file);
  return apiRequest<StoredFile>("files/upload", {
    method: "POST",
    body,
  }).then((response) => response.data);
}
