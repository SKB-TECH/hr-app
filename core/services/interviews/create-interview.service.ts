import { apiRequest } from "@/core/lib/api-client";
import type { Interview } from "@/core/types/application";

export type CreateInterviewInput = Omit<Interview, "id" | "status" | "feedback" | "application">;

export const createInterview = (input: CreateInterviewInput) =>
  apiRequest<Interview>("interviews", { method: "POST", body: JSON.stringify(input) }).then((response) => response.data);
