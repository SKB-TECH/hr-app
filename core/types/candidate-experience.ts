export type CandidateExperience = {
  id: string;
  title: string;
  companyName: string;
  employmentType: string | null;
  location: string | null;
  startDate: string;
  endDate: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CandidateExperienceInput = {
  title: string;
  companyName: string;
  employmentType?: string | null;
  location?: string | null;
  startDate: string;
  endDate?: string | null;
  description?: string | null;
};
