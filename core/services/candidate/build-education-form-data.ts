import type { CandidateEducationInput } from "@/core/types/candidate-education";

export function buildEducationFormData(input: CandidateEducationInput) {
  const body = new FormData();
  body.append("institution", input.institution.trim());
  body.append("degree", input.degree.trim());
  body.append("fieldOfStudy", input.fieldOfStudy?.trim() || "");
  body.append("startDate", input.startDate);
  body.append("isCurrent", String(input.isCurrent));
  body.append("endDate", input.isCurrent ? "" : input.endDate || "");
  body.append("grade", input.grade?.trim() || "");
  body.append("educationUrl", input.educationUrl?.trim() || "");
  body.append("description", input.description?.trim() || "");
  if (input.documentFile) body.append("documentFile", input.documentFile);
  if (input.removeDocumentFile) body.append("removeDocumentFile", "true");
  return body;
}
