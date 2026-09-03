import { apiRequest } from "@/core/lib/api-client";

export const deletePlatformFile = (fileId: string) =>
  apiRequest<{ id: string }>(`files/${fileId}`, { method: "DELETE" }).then(
    (response) => response.data,
  );
