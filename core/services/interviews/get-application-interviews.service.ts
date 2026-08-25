import { apiRequest } from "@/core/lib/api-client";
import type { Interview } from "@/core/types/application";

export const getApplicationInterviews = (applicationId: string) =>
  apiRequest<Interview[]>(`interviews/application/${applicationId}`)
    .then((response) => response.data);
