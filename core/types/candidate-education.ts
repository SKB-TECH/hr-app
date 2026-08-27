export type CandidateEducation = {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string | null;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  grade: string | null;
  educationUrl: string | null;
  documentFileUrl: string | null;
  documentFileName: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CandidateEducationInput = {
  institution: string;
  degree: string;
  fieldOfStudy?: string | null;
  startDate: string;
  endDate?: string | null;
  isCurrent: boolean;
  grade?: string | null;
  educationUrl?: string | null;
  documentFile?: File;
  removeDocumentFile?: boolean;
  description?: string | null;
};
