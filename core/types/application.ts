import type { CompanyJob } from "./job";

export type PipelineStage = { id: string; companyId: string; name: string; order: number };

export type CompanyApplication = {
  id: string;
  jobId: string;
  candidateId: string;
  stageId: string | null;
  stage: PipelineStage | null;
  job: CompanyJob;
  candidate?: {
    id: string;
    fullName: string;
    email: string;
    avatar?: string | null;
    candidateProfile?: { location?: string | null; headline?: string | null } | null;
  };
  fullName: string;
  email: string;
  phone: string | null;
  currentJobTitle: string | null;
  linkedinUrl: string | null;
  portfolioUrl: string | null;
  coverLetter: string | null;
  score: number | null;
  appliedAt: string;
};

export type ApplicationQuery = { stageId?: string; search?: string; page?: number; limit?: number };

export type ApplicationStageHistory = {
  id: string;
  applicationId: string;
  oldStageName: string;
  newStageName: string;
  note: string | null;
  createdAt: string;
  changedBy?: { id: string; fullName?: string | null; email?: string | null };
};

export type Interview = {
  id: string;
  applicationId: string;
  companyId: string;
  title: string;
  interviewerName?: string | null;
  scheduledAt: string;
  endTime: string;
  location?: string | null;
  status: string;
  feedback?: string | null;
  application?: CompanyApplication;
};
