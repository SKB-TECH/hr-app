import type { CandidateProfileInput } from "@/core/types/candidate-profile";

function appendIfDefined(body: FormData, key: string, value: string | number | null | undefined) {
  if (value !== undefined && value !== null && value !== "") body.append(key, String(value));
}

export function buildCandidateProfileFormData(input: CandidateProfileInput) {
  const body = new FormData();
  body.append("fullName", input.fullName);
  body.append("openToWork", String(input.openToWork));
  appendIfDefined(body, "phoneNumber", input.phoneNumber);
  appendIfDefined(body, "headline", input.headline);
  appendIfDefined(body, "cityName", input.cityName);
  appendIfDefined(body, "countryName", input.countryName);
  appendIfDefined(body, "address", input.address);
  appendIfDefined(body, "bio", input.bio);
  appendIfDefined(body, "gender", input.gender);
  appendIfDefined(body, "birthDate", input.birthDate);
  appendIfDefined(body, "currentSalary", input.currentSalary);
  appendIfDefined(body, "expectedSalary", input.expectedSalary);
  appendIfDefined(body, "salaryCurrency", input.salaryCurrency);
  appendIfDefined(body, "yearsExperience", input.yearsExperience);
  appendIfDefined(body, "linkedinUrl", input.linkedinUrl);
  appendIfDefined(body, "githubUrl", input.githubUrl);
  appendIfDefined(body, "portfolioUrl", input.portfolioUrl);
  appendIfDefined(body, "availability", input.availability);
  appendIfDefined(body, "workType", input.workType);
  appendIfDefined(body, "profileVisibility", input.profileVisibility);
  if (input.avatarFile) body.append("avatarFile", input.avatarFile);
  return body;
}
