export interface Applicant {
  id: number;
  name: string;
  avatar: string;
  score: number;
  stage: string;
  appliedDate: string;
  jobRole?: string;
}
