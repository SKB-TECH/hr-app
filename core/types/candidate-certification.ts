export type CandidateCertification = {
  id: string;
  name: string;
  institution: string;
  issueDate: string;
  certificateUrl: string | null;
  certificateFileUrl: string | null;
  certificateFileName: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CandidateCertificationInput = {
  name: string;
  institution: string;
  issueDate: string;
  certificateUrl?: string | null;
  description?: string | null;
  certificateFile?: File;
  removeCertificateFile?: boolean;
};
