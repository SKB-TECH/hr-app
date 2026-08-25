import { apiRequest } from "@/core/lib/api-client";
import type { Interview } from "@/core/types/application";

export const addInterviewFeedback = (interviewId: string, feedback: string) =>
  apiRequest<Interview>(`interviews/${interviewId}/feedback`, {
    method: "PATCH",
    body: JSON.stringify({ feedback }),
  }).then((response) => response.data);
