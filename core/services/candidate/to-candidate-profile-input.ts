import type { CandidateProfile, CandidateProfileInput } from "@/core/types/candidate-profile";

/**
 * Builds a full update payload for PATCH candidate/profile/update from the
 * currently-loaded profile, carrying every field forward unchanged except
 * the ones passed in `overrides`. The endpoint has no per-field PATCH
 * semantics guaranteed, so every editor on this page (bio, work preferences,
 * portfolio link, social links, additional details, the header modal) must
 * submit the complete object or risk silently wiping fields it doesn't know
 * about.
 */
export function toCandidateProfileInput(
  profile: CandidateProfile,
  overrides: Partial<CandidateProfileInput>,
): CandidateProfileInput {
  const details = profile.candidateProfile;
  return {
    fullName: profile.fullName,
    phoneNumber: profile.phoneNumber,
    gender: details?.gender,
    birthDate: details?.birthDate ? details.birthDate.slice(0, 10) : details?.birthDate,
    headline: details?.headline,
    bio: details?.bio,
    countryName: details?.countryName,
    cityName: details?.cityName,
    address: details?.address,
    currentSalary: details?.currentSalary,
    expectedSalary: details?.expectedSalary,
    salaryCurrency: details?.salaryCurrency,
    yearsExperience: details?.yearsExperience,
    linkedinUrl: details?.linkedinUrl,
    githubUrl: details?.githubUrl,
    portfolioUrl: details?.portfolioUrl,
    availability: details?.availability,
    workType: details?.workType,
    profileVisibility: details?.profileVisibility,
    openToWork: details?.openToWork ?? false,
    ...overrides,
  };
}
