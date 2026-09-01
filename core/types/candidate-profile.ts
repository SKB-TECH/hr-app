export type CandidateProfileDetails = {
  id: string;
  gender: string | null;
  birthDate: string | null;
  headline: string | null;
  bio: string | null;
  countryName: string | null;
  cityName: string | null;
  address: string | null;
  currentSalary: string | null;
  expectedSalary: string | null;
  salaryCurrency: string | null;
  yearsExperience: number | null;
  linkedinUrl: string | null;
  githubUrl: string | null;
  portfolioUrl: string | null;
  availability: string | null;
  workType: string | null;
  profileVisibility: string | null;
  openToWork: boolean;
};

export type CandidateProfile = {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string | null;
  role: string;
  status: string;
  provider: string;
  avatar: string | null;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  candidateProfile: CandidateProfileDetails | null;
};

// PATCH candidate/profile/update is multipart/form-data and entirely flat —
// no candidateProfile wrapper — with the avatar file riding in the same request.
export type CandidateProfileInput = Partial<Omit<CandidateProfileDetails, "id">> & {
  fullName: string;
  phoneNumber?: string | null;
  openToWork: boolean;
  avatarFile?: File;
};
