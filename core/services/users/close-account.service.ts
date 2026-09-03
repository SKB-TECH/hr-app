import { apiRequest } from "@/core/lib/api-client";

export const closeAccount = () =>
  apiRequest<null>("users/me", { method: "DELETE" }).then((response) => response.data);
