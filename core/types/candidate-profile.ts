export type CandidateProfile = {
  id: string;
  fullName: string;
  email: string;
  avatar: string | null;
  coverImage: string | null;
  headline: string | null;
  location: string | null;
  openToWork: boolean;
};

export type CandidateProfileInput = {
  fullName: string;
  headline?: string | null;
  location?: string | null;
  openToWork: boolean;
};

export type CandidateProfileBrandingInput = {
  avatarFile?: File;
  coverFile?: File;
};
