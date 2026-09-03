export type CandidateExperience = {
  id: string;
  position: string;
  companyName: string;
  employmentType: string | null;
  countryName: string | null;
  cityName: string | null;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CandidateExperienceInput = {
  position: string;
  companyName: string;
  employmentType?: string | null;
  countryName?: string | null;
  cityName?: string | null;
  startDate: string;
  endDate?: string | null;
  isCurrent: boolean;
  description?: string | null;
};
