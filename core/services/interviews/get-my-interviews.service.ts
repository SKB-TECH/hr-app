import { apiRequest } from "@/core/lib/api-client";
import type { Interview } from "@/core/types/application";

export const getMyInterviews = () =>
  apiRequest<Interview[]>("interviews/my").then((response) => response.data);
