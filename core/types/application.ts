import type { CompanyJob } from "./job";

export type PipelineStage = { id: string; companyId: string; name: string; order: number };

export type CompanyApplication = {
  id: string;
  jobId: string;
  candidateId: string;
  stageId: string | null;
  stage: PipelineStage | null;
  resumeId?: string | null;
  resume?: {
    id: string;
    title: string;
    fileUrl: string;
    publicId: string;
    isDefault: boolean;
  } | null;
  job: CompanyJob;
  candidate?: {
    id: string;
    fullName: string;
    email: string;
    avatar?: string | null;
    profession?: { id: string; name: string; code: string; category?: string | null } | null;
    candidateProfile?: {
      id: string;
      location?: string | null;
      cityName?: string | null;
      countryName?: string | null;
      headline?: string | null;
      bio?: string | null;
      yearsExperience?: number | null;
      availability?: string | null;
      workType?: string | null;
      languageProficiencies?: Array<{code:string;level:string}>;
      preferredProfessionIds?: string[];
      preferredCountries?: string[];
      preferredEmploymentTypes?: string[];
      acceptsRemote?: boolean;
      expectedSalaryMin?: string | null;
      expectedSalaryMax?: string | null;
      salaryCurrency?: string | null;
      candidateSkills?: Array<{skillId:string;level?:string|null;yearsExperience?:number|null;skill?:{id:string;name:string}}>;
      candidateExperiences?: Array<{id:string;jobTitle?:string|null;companyName?:string|null;description?:string|null}>;
      candidate_educations?: Array<{id:string;institution?:string|null;degree?:string|null;fieldOfStudy?:string|null}>;
      candidateCertifications?: Array<{id:string;name?:string|null;issuingOrganization?:string|null}>;
      candidatePortfolios?: Array<{id:string;title?:string|null;description?:string|null;projectUrl?:string|null}>;
      profileVisibility?: "public" | "recruiters_only" | "private";
    } | null;
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

export type CreateApplicationInput = {
  jobId: string;
  resumeId?: string;
  fullName: string;
  email: string;
  phone?: string | null;
  currentJobTitle?: string | null;
  linkedinUrl?: string | null;
  portfolioUrl?: string | null;
  coverLetter?: string | null;
};

export type ApplicationStageHistory = {
  id: string;
  applicationId: string;
  oldStageName: string;
  newStageName: string;
  note: string | null;
  createdAt: string;
  changedBy?: { id: string; fullName?: string | null; email?: string | null };
};

export type MyApplicationJob = {
  id: string;
  title: string;
  companyName: string | null;
  companyLogoUrl: string | null;
  location: string | null;
  employmentTypes: string[];
};

export type MyApplication = {
  id: string;
  jobId: string;
  job: MyApplicationJob;
  stageId: string | null;
  stage: PipelineStage | null;
  appliedAt: string;
};

export type MyApplicationQuery = { search?: string; stageId?: string; page?: number; limit?: number };

export type MyApplicationStats = {
  totalApplied: number;
  interviewed: number;
  shortlisted: number;
  hired: number;
  rejected: number;
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
