export type JobStatus = "DRAFT" | "LIVE" | "CLOSED";

export type CompanyJob = {
  id: string;
  companyId: string;
  title: string;
  status: JobStatus;
  employmentTypes: string[];
  category: string | null;
  location: string | null;
  minSalary: number | null;
  maxSalary: number | null;
  description: string | null;
  responsibilities: string | null;
  requirements: string | null;
  niceToHave: string | null;
  skills: string[];
  applicantsCount: number;
  hiredCount: number;
  hiringTarget: number;
  publishedAt: string | null;
  closesAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CompanyJobInput = {
  title: string;
  employmentTypes: string[];
  minSalary?: number;
  maxSalary?: number;
  category?: string;
  skills?: string[];
  description?: string;
  responsibilities?: string;
  requirements?: string;
  niceToHave?: string;
  status?: JobStatus;
};

export type CompanyJobQuery = { status?: JobStatus; search?: string; page?: number; limit?: number };
