export type CandidateEducation = {
  id: string;
  schoolName: string;
  degree: string;
  fieldOfStudy: string | null;
  startDate: string;
  endDate: string | null;
  grade: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CandidateEducationInput = {
  schoolName: string;
  degree: string;
  fieldOfStudy?: string | null;
  startDate: string;
  endDate?: string | null;
  grade?: string | null;
  description?: string | null;
};
