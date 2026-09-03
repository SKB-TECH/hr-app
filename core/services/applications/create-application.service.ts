import { apiRequest } from "@/core/lib/api-client";
import type { CompanyApplication, CreateApplicationInput } from "@/core/types/application";

export const createApplication = (input: CreateApplicationInput) =>
  apiRequest<CompanyApplication>("applications", {
    method: "POST",
    body: JSON.stringify(input),
  }).then((response) => response.data);
