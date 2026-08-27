import type { CandidateCertificationInput } from "@/core/types/candidate-certification";

export function buildCertificationFormData(input: CandidateCertificationInput) {
  const body = new FormData();
  body.append("name", input.name.trim());
  body.append("institution", input.institution.trim());
  body.append("issueDate", input.issueDate);
  body.append("certificateUrl", input.certificateUrl?.trim() || "");
  body.append("description", input.description?.trim() || "");
  if (input.certificateFile) body.append("certificateFile", input.certificateFile);
  if (input.removeCertificateFile) body.append("removeCertificateFile", "true");
  return body;
}
