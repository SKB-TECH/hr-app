export type CandidateResume = {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize: number | null;
  isDefault: boolean;
  createdAt: string;
};

export type CandidateResumeInput = {
  file: File;
};
