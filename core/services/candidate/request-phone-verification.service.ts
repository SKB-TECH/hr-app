import { apiRequest } from "@/core/lib/api-client";
import type { RequestPhoneVerificationInput } from "@/core/types/candidate-phone";

// NOTE: placeholder endpoint. No candidate phone-verification route exists
// in the integrated API surface — swap this path once the real one exists.
export const requestPhoneVerification = (input: RequestPhoneVerificationInput) =>
  apiRequest<{ requestId: string }>("candidate/phone/verify/request", {
    method: "POST",
    body: JSON.stringify(input),
  }).then((response) => response.data);
