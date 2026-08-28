export type CandidateCertification = {
  id: string;
  title: string;
  organization: string;
  issueDate: string;
  expirationDate: string | null;
  credentialId: string | null;
  credentialUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CandidateCertificationInput = {
  title: string;
  organization: string;
  issueDate: string;
  expirationDate?: string | null;
  credentialId?: string | null;
  credentialUrl?: string | null;
};
