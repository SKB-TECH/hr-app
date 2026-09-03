export type CandidateProfileSuggestionExperience = {
  position?: string;
  companyName?: string;
  startDate?: string;
  endDate?: string | null;
  description?: string | null;
};

export type CandidateProfileSuggestionEducation = {
  schoolName?: string;
  degree?: string;
  fieldOfStudy?: string | null;
  startDate?: string;
  endDate?: string | null;
};

export type CandidateProfileSuggestionCertification = {
  name?: string;
  issuingOrganization?: string;
  issueDate?: string;
};

export type CandidateProfileSuggestion = {
  resumeId: string;
  status?: string;
  headline?: string | null;
  bio?: string | null;
  skills?: string[];
  experiences?: CandidateProfileSuggestionExperience[];
  educations?: CandidateProfileSuggestionEducation[];
  certifications?: CandidateProfileSuggestionCertification[];
};
