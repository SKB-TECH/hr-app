export type ApplicantTabs =
  | "Applicant Profile"
  | "Resume"
  | "Hiring Process"
  | "Interview Schedule";

export interface PersonalInfoItem {
  id: number;
  label: string;
  value: string | string[];
  subValue?: string;
  isFullWidth?: boolean;
}

export interface ProfessionalDetail {
  id: number;
  label: string;
  value: string;
}

export interface ProfessionalInfo {
  about: string[];
  details: ProfessionalDetail[];
  skills: string[];
}

export interface ApplicantDetails {
  name: string;
  image: string;
  title: string;
  ratings: number;
  applicationDate: string;
  appliedJobs: { title: string; type: string; field: string }[];
}

export interface SocialMedia {
  email?: string;
  phone?: string;
  instagram?: string;
  twitter?: string;
  website?: string;
}

export type Stage =
  | "In-Review"
  | "Shortlisted"
  | "Interview"
  | "Hired / Declined";

export interface ApplicationStage {
  title: Stage;
  stage: number;
  totalStages: number;
}

// cover the whole applicant information
export interface Applicant {
  id: number;
  personalInfo: PersonalInfoItem[];
  professionalInfo: ProfessionalInfo;
  applicantDetails: ApplicantDetails;
  socialMedia?: SocialMedia;
  applicationStage: ApplicationStage;
}

export interface Note {
  id: number;
  authorName: string;
  authorInitials: string;
  avatarImage: string;
  date: string;
  message: string;
  replyCount?: number;
}

export interface Assignee {
  initials: string;
  avatar: string;
}
export interface InterviewSlot {
  id: number;
  candidateName: string;
  candidateInitials: string;
  testType: string;
  timeRange: string;
  location: string;
  profile_image: string;
}

export interface InterviewDay {
  date: string;
  slots: InterviewSlot[];
}
